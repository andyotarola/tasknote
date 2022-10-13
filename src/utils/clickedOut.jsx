import { useEffect } from "react";

/**
    * Función para quitar un componente al hacer click fuera de él.
**/ 
export default function clickedOut(handleClick) {
    useEffect(() => {
        // Escucha el evento click del componente
        document.addEventListener("click", handleClick)

        return () => {
            /**
             * Al momento de eliminar el el compoente se tendra que remove el "EventListener",
             * ya que sino el "eventListener" se seguira ejecuntando.
            **/
            document.removeEventListener("click" , handleClick)
        };
    }, []);
}