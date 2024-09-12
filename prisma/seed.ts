import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const shapesData = [
    {
        shapeName: 'Persegi',
        type: 'BangunDatar',
        formula: 'p^2',
        parameters: 'p',
        formulaType: 'Luas'
    },
    {
        shapeName: 'Lingkaran',
        type: 'BangunDatar',
        formula: '3.14 * r^2',
        parameters: 'r',
        formulaType: 'Luas'
    },
    {
        shapeName: 'Segitiga',
        type: 'BangunDatar',
        formula: '0.5 * p * l',
        parameters: 'p, l',
        formulaType: 'Luas'
    },
    {
        shapeName: "Limas",
        type: "BangunRuang",
        formula: "p^2 + 2 * p * t",
        parameters: "p, t",
        formulaType: "Luas",
    },
    {
        shapeName: "Limas",
        type: "BangunRuang",
        formula: "(1/3) * p * l * t",
        parameters: "p, l, t",
        formulaType: "Volume",
    },
    {
        shapeName: 'Kubus',
        type: 'BangunRuang',
        formula: '6 * p^2',
        parameters: 'p',
        formulaType: 'Luas'
    },
    {
        shapeName: 'Kubus',
        type: 'BangunRuang',
        formula: 'p^3',
        parameters: 'p',
        formulaType: 'Volume'
    },
    {
        shapeName: 'Tabung',
        type: 'BangunRuang',
        formula: '2 * 3.14 * r * (r + t)',
        parameters: 'r, t',
        formulaType: 'Luas'
    },
    {
        shapeName: 'Tabung',
        type: 'BangunRuang',
        formula: '3.14 * r^2 * t',
        parameters: 'r, t',
        formulaType: 'Volume'
    }
];

async function seed() {
    // Drop all existing data
    await prisma.shape.deleteMany({});

    // Seed new data
    for (const shapeData of shapesData) {
        await prisma.shape.create({
            data: {
                shapeName: shapeData.shapeName as any,
                type: shapeData.type as any,
                formula: shapeData.formula,
                parameters: shapeData.parameters,
                formulaType: shapeData.formulaType as any,
            },
        });
    }

    console.log('Shapes have been seeded!');
}

// Run the seed function
seed()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
