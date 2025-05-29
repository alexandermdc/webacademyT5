import { Request, Response } from "express";
import { LoremIpsum } from "lorem-ipsum";

function generateLorem(paragraphs: number): string[] {
  const lorem = new LoremIpsum({
    sentencesPerParagraph: { max: 8, min: 4 },
    wordsPerSentence: { max: 16, min: 4 },
  });

  return Array.from({ length: paragraphs }, () => lorem.generateParagraphs(1));
}

const lorem = (req: Request, res: Response): void => {
  const count = parseInt(req.params.count || '1', 10); // padrão: 1 parágrafo

  const validCount = isNaN(count) || count < 1 ? 1 : count;

  const paragraphs = generateLorem(validCount);

  const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <title>Lorem Ipsum</title>
      <style>
        body { font-family: Georgia, serif; padding: 20px; line-height: 1.6; }
        p { margin-bottom: 1.2em; }
      </style>
    </head>
    <body>
      ${paragraphs.map(p => `<p>${p}</p>`).join('')}
    </body>
    </html>
  `;

  res.send(html);
};
const index = (req: Request, res: Response) => {
    res.send("Hello world!");
};

const hb1 = (req: Request, res: Response) => {
    res.render("main/hb1", {
        uf: 'Universidade Federal do Amazonas',
    });
};

const hb2 = (req: Request, res: Response) => {
    res.render("main/hb2", {
        poweredByNodejs: true,
        name: 'Express',
        type: 'Framework',

    });
};

const hb3 = (req: Request, res: Response) => {
    const professores = [
        { nome: "David Fernandes", room: 1238 },
        { nome: "Horácio Fernandes", room: 1239 },
        { nome: "Edleno Moura", room: 1240 },
        { nome: "Elaine Harada", room: 1241 },
    ];
    res.render("main/hb3", {
        professores,
    });
};
const hb4 = (req: Request, res: Response) => {
    const technologies = [
        { name: 'Express', type: 'Framework', poweredByNodejs: true },
        { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
        { name: 'React', type: 'Library', poweredByNodejs: true },
        { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
        { name: 'Django', type: 'Framework', poweredByNodejs: false },
        { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
        { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
    ];
    res.render("main/hb4", {
        technologies,
    });
};

export default {index, hb1, hb2, hb3, hb4, lorem};