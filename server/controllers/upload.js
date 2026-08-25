const upload = async (req, res, next) => {
    try {
        if (!req.file) {
            const error = new Error('No file uploaded');
            error.status = 400;
            throw error;
        }

        const file = req.file;

        res.status(200).json({ message: 'File uploaded successfully', file: file });

    } catch (error) {
        next(error);
    }
};

module.exports = { upload };z