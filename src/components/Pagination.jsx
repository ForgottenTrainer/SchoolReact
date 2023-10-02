import React, { useState } from 'react'
import { Button, IconButton, useAccordion } from "@material-tailwind/react";

const Pagination = ({maximo, pagina, setPagina}) => {
    
    //for(let i = 1; i <)

    const getItemProps = (index) =>
      ({
        variant: pagina === index ? "filled" : "text",
        color: "gray",
        onClick: () => setPagina(index),
      });
   
    const next = () => {
      if (pagina === 5) return;
   
      setPagina(pagina + 1);
    };
   
    const prev = () => {
      if (pagina === 1) return;
   
      setPagina(pagina - 1);
    };
   
  return (
    <div>
        <div className="flex items-center gap-4 mx-auto mt-5">
            <Button
            variant="text"
            className="flex items-center gap-2"
            onClick={prev}
            disabled={pagina === 1}
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
                Anterior
            </Button>
            <div className="flex items-center gap-2">
            {Array.from({ length: maximo }).map((_, index) => (
              <IconButton key={index} {...getItemProps(index +1)}>
                {index + 1} {/* Añade 1 al índice */}
              </IconButton>
            ))}
            </div>
            <Button
            variant="text"
            className="flex items-center gap-2"
            onClick={next}
            disabled={pagina === maximo}
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
                Siguiente
            </Button>
        </div>
    </div>
  )
}

export default Pagination