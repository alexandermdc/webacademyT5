import { Router, Request, Response } from 'express';
import { LoremIpsum } from 'lorem-ipsum';

const router = Router();

function generateLorem(paragraphs: number): string[] {
  const lorem = new LoremIpsum({
    sentencesPerParagraph: { max: 8, min: 4 },
    wordsPerSentence: { max: 16, min: 4 },
  });

  return Array.from({ length: paragraphs }, () => lorem.generateParagraphs(1));
}

router.get(['/', '/:count'], (req: Request, res: Response): void => {
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
});

export default router;
