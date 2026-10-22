// Barra fina no topo enquanto o modo palco espera o React hidratar (ver .carregando em index.css).
// Nao bloqueia nada: o hero ja esta na tela, a barra so avisa que a rolagem ainda nao responde.
export default function Carregando() {
  return <div aria-hidden="true" className="carregando" />;
}
