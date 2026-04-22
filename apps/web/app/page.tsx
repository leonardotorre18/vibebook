export default function Home() {
  return (
    <div>
      <header className="bg-sky-700 text-white">
        <nav className="flex justify-between items-center px-12 py-4">
          <div>
            <p className="font-extrabold text-xl">
              Vibebook
            </p>
          </div>
          <div>
            <form className="flex gap-4 items-end text-sm">
              <label htmlFor="email" className="flex flex-col gap-1">
                Correo:
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-white text-black px-1"
                />
              </label>
              <label htmlFor="password" className="flex flex-col gap-1">
                Contraseña:
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="bg-white text-black px-1"
                />
              </label>
              <button type="submit" className="px-3 py-1 bg-sky-600 font-semibold">Iniciar</button>
            </form>
          </div>
        </nav>
      </header>

      <main className="px-12 py-6">
        <div></div>
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xl font-bold">Crea una cuenta</p>
            <p className="font-semibold">Vibebook es gratis y siempre lo será</p>
          </div>
          <form className="flex flex-col gap-4">
            <div className="flex gap-4">
              <input
                type="text"
                name="name"
                id="name"
                className="bg-white px-3 py-1 flex-1"
                placeholder="Nombre"
              />
              <input
                type="text"
                name="lastname"
                id="lastname"
                className="bg-white px-3 py-1 flex-1"
                placeholder="Apellido"
              />
            </div>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-white px-3 py-1"
              placeholder="Correo"
            />
            <input
              type="password"
              name="password"
              id="password"
              className="bg-white px-3 py-1"
              placeholder="Contraseña"
            />
            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              className="bg-white px-3 py-1"
              placeholder="Confirma tu Contraseña"
            />
            <div className="flex flex-col gap-2">
              <span>Fecha de Nacimiento</span>
              <div className="flex gap-3">
                <input
                  type="month"
                  name="month"
                  id="month"
                  className="bg-white px-3 py-1"
                  placeholder="Mes"
                />
                <input
                  type="number"
                  name="day"
                  id="day"
                  className="bg-white px-3 py-1"
                  placeholder="Día"
                />
                <input
                  type="number"
                  name="year"
                  id="year"
                  className="bg-white px-3 py-1"
                  placeholder="Año"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <label htmlFor="male">
                <input type="checkbox" name="male" id="male" />
                Masculino
              </label>
              <label htmlFor="female">
                <input type="checkbox" name="female" id="female" />
                Femenino
              </label>
            </div>
            <div>
            <button type="submit" className="bg-green-600 text-white text-lg font-bold px-8 py-2">Crear Cuenta</button>
            </div>
          </form>
        </div>
      </main>

      <footer className="bg-white px-12 py-6">
        <p className="opacity-60">BookFace © 2016</p>
      </footer>
    </div>
  );
}
