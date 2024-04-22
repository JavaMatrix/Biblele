import bibleData from '../BibleData.json' with {type: 'json'};
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';

export const getVerse = asyncHandler(async (req, res) => {
    const { password } = req.body;

    if (!(await bcrypt.compare(password, process.env.password))) {
        res.status(401);
        return;
    }

    const day = Math.floor((new Date()).getTime() / (24 * 60 * 60 * 1000)) % bibleData.length;

    res.status(200).json(bibleData[day]);
});