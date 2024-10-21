import React from "react";
import { PartidoComponent } from "@/components/Partido";
import style from "./style.module.css";

export default function Match() {
  return (
    <div className={`${style.conteiner}`}>
      <PartidoComponent />
    </div>
  );
}
