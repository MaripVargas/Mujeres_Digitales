import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedProducts1759616809009 implements MigrationInterface {
  name = 'SeedProducts1759616809009';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Crear la tabla de productos si no existe
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`product\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`name\` varchar(255) NOT NULL,
        \`description\` varchar(255) NULL,
        \`category\` varchar(255) NOT NULL,
        \`price\` decimal(10,2) NOT NULL,
        \`stock\` int NOT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB;
    `);

    // Insertar productos iniciales
    await queryRunner.query(`
      INSERT INTO \`product\` (\`name\`, \`description\`, \`category\`, \`price\`, \`stock\`)
      VALUES
        ('Silla ergonómica', 'Silla de oficina con soporte lumbar', 'Muebles', 350000.00, 15),
        ('Escritorio de madera', 'Escritorio con superficie amplia y compartimientos', 'Muebles', 480000.00, 10),
        ('Monitor LED 24 pulgadas', 'Pantalla LED Full HD', 'Tecnología', 720000.00, 8),
        ('Teclado mecánico', 'Teclado retroiluminado con switches rojos', 'Tecnología', 220000.00, 20),
        ('Cafetera automática', 'Cafetera con temporizador y función de apagado automático', 'Electrodomésticos', 380000.00, 12),
        ('Juego de sartenes antiadherentes', 'Set de 3 piezas con recubrimiento cerámico', 'Hogar', 150000.00, 25),
        ('Audífonos inalámbricos', 'Bluetooth con cancelación de ruido', 'Tecnología', 260000.00, 30),
        ('Lámpara de escritorio LED', 'Luz regulable con puerto USB', 'Hogar', 95000.00, 18);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Eliminar solo los productos insertados por esta migración
    await queryRunner.query(`
      DELETE FROM \`product\`
      WHERE \`name\` IN (
        'Silla ergonómica',
        'Escritorio de madera',
        'Monitor LED 24 pulgadas',
        'Teclado mecánico',
        'Cafetera automática',
        'Juego de sartenes antiadherentes',
        'Audífonos inalámbricos',
        'Lámpara de escritorio LED'
      );
    `);
  }
}
