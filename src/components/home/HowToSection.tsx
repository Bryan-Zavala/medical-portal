import Link from "next/link";
export function HowToSection() {
  return (
    <section id="appointments" className="px-6 py-20 bg-slate-100">
      <div className="mx-auto max-w-6xl">
        <div className="pb-10">
          <h2 className="mt-3 pb-5 text-4xl text-center font-bold text-[#4c5895]">
            ¿Cómo solicitar una cita médica?
          </h2>
          <p className="text-center ml-30 mr-30">
            Para registrase como paciente de nuestros hospitales debera mandar
            un correo a{" "}
            <Link
              href="mailto:soporte@mediportal.com"
              className="text-blue-700 font-semibold hover:underline"
            >
              soporte@mediportal.com
            </Link>{" "}
            con sus datos personales. Dentro de las mismas 24hs le llegará un
            correo con las credenciales correspondientes para que pueda tener
            acceso a nuestros mejores servicios. Acceda a nuestro portal
            mediante su usuario y contraseña.
          </p>
        </div>

        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <video
            width="100%"
            controls
            preload="none"
            className="rounded-2xl shadow-xl"
            aria-label="Video tutorial para solicitar citas"
          >
            <source src="/video-cita.mp4" type="video/mp4" />
            <track kind="captions" srcLang="es" label="Español" src="/captions.vtt" />
            Tu navegador no soporta la reproducción de video.
          </video>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="border-gray-300 border-b w-270 h-20 m-5 "></div>
      </div>
    </section>
  );
}
