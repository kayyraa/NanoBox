import * as Api from "./api.js";
import * as Ambient from "./ambient.js";

function Loop() {
    if (Api.Particles.length > 0) {
        Api.Particles.forEach(Particle => {
            let Velocity = parseInt(Particle.dataset.Velocity) || 0;
            let NewVelocity = Velocity;

            const Pos = {
                X: Particle.offsetLeft,
                Y: Particle.offsetTop
            };

            if (Particle.dataset.Type === "Solid") {
                return;
            }

            if (parseFloat(Particle.dataset.Temp) >= parseFloat(Particle.dataset.Melt)) {
                if (Particle.dataset.Type === "Liquid") {
                    Particle.dataset.Type = Particle.dataset.Molten;
                } else if (Particle.dataset.Type === "Solid") {
                    Particle.dataset.Type = Particle.dataset.Molten;
                }
            } else {
                if (Particle.dataset.Type === "Liquid") {
                    Particle.dataset.Type = Particle.dataset.NormalType;
                } else if (Particle.dataset.Type === "Solid") {
                    Particle.dataset.Type = Particle.dataset.Cold;
                }
            }

            Api.Particles.forEach(OtherParticle => {
                if (OtherParticle !== Particle) {
                    if (Api.Particle.IsColliding(Particle, OtherParticle)) {
                        const AverageTemp = (parseFloat(Particle.dataset.Temp) + parseFloat(OtherParticle.dataset.Temp)) / 2;
                        Particle.dataset.Temp = AverageTemp;
                        OtherParticle.dataset.Temp = AverageTemp;
                    }
                }
            });

            () => {
                return;
                const GridBlock = Ambient.GetClosestGridBlock(Particle.offsetLeft, Particle.offsetTop);
                if (GridBlock) {
                    const CurrentTemp = parseInt(GridBlock.dataset.Temp);
                    const CurrentPres = parseInt(GridBlock.dataset.Pres);
                    const ParticleTemp = parseInt(Particle.dataset.Temp);
                    const ParticlePres = parseFloat(Particle.dataset.Pres);
                
                    GridBlock.dataset.Temp = (CurrentTemp + ParticleTemp) / 2;
                    GridBlock.dataset.Pres = (CurrentPres + ParticlePres) / 2;
                    Particle.dataset.Pres -= Math.min(0, ParticlePres - 0.25);
                    Particle.dataset.Temp -= Math.min(22, ParticleTemp - 0.125);
                }
            }

            if (Particle.dataset.Type.includes("Powder")) {
                const Density = Particle.dataset.Physics ? JSON.parse(Particle.dataset.Physics).Density : 0;
                const Elasticity = Particle.dataset.Physics ? JSON.parse(Particle.dataset.Physics).Elasticity : 0;

                NewVelocity = (Velocity + Density) + (window.Gravity || 0);
                const NewPosY = Pos.Y + NewVelocity;

                if ((NewPosY + Particle.offsetHeight) <= Api.ParticleContainer.clientHeight && !Api.Particle.IsPlaceOccupied(Pos.X, NewPosY)) {
                    Particle.style.top = `${Math.round(NewPosY / window.GridSize) * window.GridSize}px`;
                    Particle.dataset.Velocity = NewVelocity;
                } else if (Elasticity) {
                    const BounceFactor = Api.Random(Elasticity - 0.2, Elasticity + 0.2) || 0.8;
                    NewVelocity = -NewVelocity * BounceFactor;
                    const NewPosYAfterBounce = Pos.Y + NewVelocity;
                    Particle.style.top = `${Math.round(NewPosYAfterBounce / window.GridSize) * window.GridSize}px`;
                    Particle.dataset.Velocity = NewVelocity;
                } else {
                    Particle.dataset.Velocity = 0;
                }
            }

            if (Particle.dataset.Type.includes("Liquid")) {
                NewVelocity = Velocity + (window.Gravity || 0);
                const NewPosY = Pos.Y + NewVelocity;
            
                if (NewPosY + Particle.offsetHeight <= Api.ParticleContainer.clientHeight && !Api.Particle.IsPlaceOccupied(Pos.X, NewPosY)) {
                    Particle.style.top = `${Math.round(NewPosY / window.GridSize) * window.GridSize}px`;
                    Particle.dataset.Velocity = NewVelocity;
                } else {
                    Particle.dataset.Velocity = 0;
            
                    const LeftPosX = Pos.X - window.GridSize;
                    const RightPosX = Pos.X + window.GridSize;
                    const CanMoveLeft = !Api.Particle.IsPlaceOccupied(LeftPosX, Pos.Y);
                    const CanMoveRight = !Api.Particle.IsPlaceOccupied(RightPosX, Pos.Y);
            
                    if (CanMoveLeft && CanMoveRight) {
                        const RandomDirection = Math.random() < 0.5 ? LeftPosX : RightPosX;
                        Particle.style.left = `${Math.round(RandomDirection / window.GridSize) * window.GridSize}px`;
                    } else if (CanMoveLeft) {
                        Particle.style.left = `${Math.round(LeftPosX / window.GridSize) * window.GridSize}px`;
                    } else if (CanMoveRight) {
                        Particle.style.left = `${Math.round(RightPosX / window.GridSize) * window.GridSize}px`;
                    }
                }
            }

            if (Particle.offsetTop > Api.ParticleContainer.clientHeight || Particle.offsetLeft > (Api.ParticleContainer.clientWidth - Particle.offsetHeight)) {
                Particle.remove();
            }
        });
    }

    requestAnimationFrame(Loop);
}

Loop();