import { ArrowRight, Cloud, List, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import homePhone from "../assets/home-celular.png";

function Home() {
    return (
        <div className="home-page">
            <section className="home-hero">
                <div className="home-hero-content">
                    <p className="home-eyebrow">Bienvenido a <span>MATECODE</span></p>
                    <h1 className="home-title">Organiza tus Tareas.
                        <span>Simplifica tu dia a dia</span>
                    </h1>
                    <p className="home-description">
                        Una aplicacion simple y moderna para gestionar tus tareas,
                        mantenerte organizado y ser mas prductivo desde cualquier dispositivo.
                    </p>
                    <Link className="home-cta" to="/tasks">
                        Ir a mis tareas
                        <ArrowRight />
                    </Link>
                </div>

                <div className="home-hero-visual">
                    <img src={homePhone} alt="Vista previa de tareas" />
                </div>
            </section>

            <section className="home-features">
                <h2>¿Que podes hacer?</h2>
                <div className="home-features-grid">
                    <article className="home-feature-card">
                        <List />
                        <h3>Gestion de tareas</h3>
                        <p>Crea, edita, completa y elimina tareas facilmente</p>
                    </article>
                    <article className="home-feature-card">
                        <Cloud />
                        <h3>Tus datos en la nube</h3>
                        <p>Todo se guarda de forma segura con Firebase</p>
                    </article>
                    <article className="home-feature-card">
                        <Mail />
                        <h3>Resumen por Email</h3>
                        <p>Recibi un resumen de tus tareas cuando lo necesites</p>
                    </article>
                </div>
            </section>
        </div>
    )
}

export default Home
