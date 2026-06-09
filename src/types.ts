export interface FloatingAsset {
  id: string;
  emoji: string;
  type: 'kiss' | 'mouth' | 'lipstick' | 'heels' | 'heart' | 'sparkle' | 'stocking';
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  scale: number;
  duration: number;
  delay: number;
  rotation: number;
}

export interface SassyQuote {
  id: string;
  text: string;
  category: 'tacones' | 'makeup' | 'amor' | 'tumbao';
  tag: string;
}

export interface LipstickShade {
  id: string;
  name: string;
  hex: string;
  flavorText: string;
}

export const SHOW_DETAILS = {
  title: "MI MUNDO POR DENTRO",
  subtitle: "¡El monólogo más divertido y picante del año!",
  performer: "Mariana Quintero",
  instagram: "https://www.instagram.com/__marianaquintero__?igsh=anN5eDk3cm0zbnJp",
  date: "19 de Junio",
  time: "20:00 h",
  entrance: "ENTRADA LIBRE",
  address: "C. del Gral. Álvarez de Castro, 10, Chamberí, 28010 Madrid, España",
  mapsLink: "https://maps.app.goo.gl/JiWcN3U73MCXpXYy9",
  whatsappNumber: "+34666667542",
  whatsappMessage: "¡Hola! 💋 Quisiera reservar o tener información sobre el monólogo 'Mi Mundo Por Dentro' de Mariana Quintero el 19 de Junio.",
};

export const INSTAGRAM_PERFORMER = "__marianaquintero__";

export const SASSY_QUOTES: SassyQuote[] = [
  {
    id: "q1",
    text: "Los tacones altos son para estar un poquito más cerca del cielo... o para clavárselos a quien te haga perder el tiempo. 👠",
    category: "tacones",
    tag: "Tacones de Escándalo"
  },
  {
    id: "q2",
    text: "Mi mundo por dentro es como mi bolso: hay de todo, casi nada tiene sentido y siempre tardo media hora en encontrar las llaves de mi felicidad. 🔑",
    category: "makeup",
    tag: "Caos Interno"
  },
  {
    id: "q3",
    text: "Pintarse los labios de rojo pasión no es un detalle estético... es una advertencia de que hoy vengo con mi mejor tumbao. 💄",
    category: "makeup",
    tag: "Labios de Fuego"
  },
  {
    id: "q4",
    text: "Las medias de red sostienen muy bien las piernas, pero sostienen todavía mejor mi autoestima cuando salgo a comerme Madrid. 🧦",
    category: "tacones",
    tag: "Poder Femenino"
  },
  {
    id: "q5",
    text: "La lencería erótica es fantástica porque te hace sentir una diosa empoderada... aunque estés comiendo pizza soltera en el sofá con calcetines de lana. 🔥",
    category: "amor",
    tag: "Cabaret Secreto"
  },
  {
    id: "q6",
    text: "El amor verdadero existe: se llama amor propio y viene acompañado de unos buenos zapatos altos, labios hidratados y risas sin filtro. 💖",
    category: "amor",
    tag: "Amor Propio"
  },
  {
    id: "q7",
    text: "Entrada libre, porque las mejores cosas de esta vida siempre son libres: el viento, la risa, el deseo y Mariana en el escenario. ✨",
    category: "tumbao",
    tag: "Puro Tumbao"
  },
  {
    id: "q8",
    text: "Mis curvas no son peligrosas, lo peligroso es mi lengua cuando me subo a un escenario con un micrófono y ganas de contarlo todo. 🫦",
    category: "tumbao",
    tag: "Sin Censura"
  }
];

export const LIPSTICK_SHADES: LipstickShade[] = [
  {
    id: "shade1",
    name: "Tumbao Red",
    hex: "#e11d48",
    flavorText: "Un rojo picante que te da el poder de decir lo que te dé la gana con una gran sonrisa."
  },
  {
    id: "shade2",
    name: "Pecado Fucsia",
    hex: "#db2777",
    flavorText: "El fucsia perfecto para noches de stand-up, tacones y confesiones divertidas."
  },
  {
    id: "shade3",
    name: "Peligro Nude",
    hex: "#b45309",
    flavorText: "Parece sutil, pero este tono cálido esconde intenciones muy divertidas."
  },
  {
    id: "shade4",
    name: "Nocturno Plum",
    hex: "#701a75",
    flavorText: "Para las que amamos el misterio, la noche madrileña y un buen vino en mano."
  }
];
