export const validateSchema = (Schema) => (req, res, next) => {
    try {
        const data = req.body;
        console.log('Datos recibidos:', data);
        Schema.parse(data);
        next();
    } catch (error) {
        console.log('Error de validación:', error.errors);
        return res.status(400).json({ error: error.errors.map(error => error.message) });
    }
};
