	mport fetch from "node-fetch";
import { XMLParser } from "fast-xml-parser";

export async function leerRSS(req, res) {
  try {
    const url = "https://www.linux.org/articles/index.rss";

    const respuesta = await fetch(url);
    const xml = await respuesta.text();

    const parser = new XMLParser({ ignoreAttributes: false });
    const data = parser.parse(xml);

    const items = data.rss.channel.item;

    const articulos = items.map(i => ({
      titulo: i.title,
      fecha: i.pubDate,
      enlace: i.link,
      autor: i["dc:creator"],
      contenido: i["content:encoded"]
    }));

    res.json(articulos);
  } catch (error) {
    res.status(500).json({ error: "No se pudo leer el RSS" });
  }
}
