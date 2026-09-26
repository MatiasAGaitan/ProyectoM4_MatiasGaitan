import { CheckCircle, Cpu, Target, NotebookText } from "lucide-react"
import aboutLaptop from "../assets/about-portatil.png"
import reactLogo from "../assets/react.svg"
import tsLogo from "../assets/ts.svg"
import firebaseLogo from "../assets/firebase.svg"
import viteLogo from "../assets/vite.svg"
import githubLogo from "../assets/github.svg"

function About() {
    return (
        <div className="about-page">
            <section className="about-hero">
                <div className="about-hero-content">
                    <p className="about-eyebrow">ACERCA DE</p>
                    <h1>Mate<span>Code</span></h1>
                    <p>
                        Un proyecto pensado para facilitar la organizacion diaria
                        atraves de una interfaz simple, moderna y accesible.
                    </p>
                </div>
                <div className="about-hero-visual">
                    <img src={aboutLaptop} alt="Vista previa de MateCode" />
                </div>
            </section>

            <section className="about-grid">
                <div className="about-card about-card--objective">
                    <h2><Target />El objetivo</h2>
                    <p>Facilitar la organizacion de tareas diarias
                        mediante una herramienta simple,
                        intuitiva y accesible desde cualquier
                        dispostivo.
                    </p>
                </div>

                <div className="about-card about-card--features">
                    <h2><CheckCircle />Funcionalidades</h2>
                    <ul>
                        <li>Registro e inicio de sesion</li>
                        <li>CRUD basico de tareas</li>
                        <li>Estado pendiente / completada</li>
                        <li>Persistencia en la nube (Firebase)</li>
                        <li>Resumen de tareas por email</li>
                    </ul>
                </div>

                <div className="about-card about-card--tech">

                    <h2> <Cpu />Tecnologias utilizadas</h2>
                    <div className="about-tech-list">
                        <div className="about-tech-item">
                            <img src={reactLogo} alt="react" />
                            <p>React</p>
                        </div>
                        <div className="about-tech-item">
                            <img src={tsLogo} alt="typescript" />
                            <p>TypeScript</p>
                        </div>
                        <div className="about-tech-item">
                            <img src={firebaseLogo} alt="firebase" />
                            <p>Firebase</p>
                        </div>
                        <div className="about-tech-item">
                            <img src={viteLogo} alt="vite" />
                            <p>Vite</p>
                        </div>
                        <div className="about-tech-item">
                            <img src={githubLogo} alt="GitHub" />
                            <p>GitHub</p>
                        </div>
                    </div>
                </div>

                <div className="about-card about-card--project">
                    <h2><NotebookText />Sobre el proyecto</h2>
                    <p>MateCode fue desarrollado por {<a href="https://github.com/MatiasAGaitan" target="_blank" rel="noreferrer">
                        Matias Gaitan
                    </a>} como proyecto final del Módulo 4 de Henry, con fines educativos y de práctica.
                        El objetivo del proyecto es aplicar de forma práctica conceptos de React, TypeScript, React Router,
                        Firebase Authentication y Firestore, construyendo una aplicación para gestionar tareas de forma simple, responsive y accesible.</p>
                </div>
            </section>

        </div>
    )
}

export default About
