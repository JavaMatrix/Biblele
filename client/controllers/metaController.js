import bibleMeta from '../BibleMeta.json' with {type: 'json'};
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';

const bibleBooks = Object.keys(bibleMeta);

export const getMeta = asyncHandler(async (req, res) => {
    const { password, book, chapter } = req.body;

    if (!(await bcrypt.compare(password, process.env.password))) {
        res.status(401);
        return;
    }

    if (!book) {
        res.status(200).json(bibleMeta);
    }

    if (!chapter) {
        res.status(200).json(bibleMeta[book])
    }

    res.status(200).json(bibleMeta[book][chapter]);
});

export const checkBeforeAfter = asyncHandler(async (req, res) => {
    const { password, book1, book2 } = req.body;

    if (!(await bcrypt.compare(password, process.env.password))) {
        res.status(401);
        return;
    }

    if (!book1 || !book2) {
        res.status(400).json({ err: "not enough books given" });
    }

    const index1 = bibleBooks.indexOf(book1);
    const index2 = bibleBooks.indexOf(book2);

    if (index1 == -1 || index2 == -1) {
        res.status(400).json({ err: "invalid books" });
    }

    res.status(200).json({ result: index1 < index2 ? "before" : "after" });
});