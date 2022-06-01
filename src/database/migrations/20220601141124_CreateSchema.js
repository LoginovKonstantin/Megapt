exports.up = function (knex) {
  return knex.raw(`
    CREATE TABLE "groups" (
      "id" serial NOT NULL,
      "name" text NOT NULL,
      "parent_id" int DEFAULT NULL,
      "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "pk_groups" PRIMARY KEY ("id")
    );
    
    CREATE TABLE "products" (
      "id" serial NOT NULL,
      "name" text NOT NULL,
      "description" text NOT NULL,
      "producer" text NOT NULL,
      "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "pk_products" PRIMARY KEY ("id")
    );
    
    CREATE TABLE "groups_products" (
      "id" serial NOT NULL,
      "product_id" int NOT NULL,
      "group_id" int NOT NULL,
      "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "pk_groups_products" PRIMARY KEY ("id")
    );
    
    ALTER TABLE "groups_products" ADD CONSTRAINT "fk_groups_products_product_id" FOREIGN KEY(product_id)
    REFERENCES products (id);
    
    ALTER TABLE "groups_products" ADD CONSTRAINT "fk_groups_products_group_id" FOREIGN KEY(group_id)
    REFERENCES groups (id);
  `);
};

exports.down = function (knex) {
  return knex.raw(`
    ALTER TABLE groups_products DROP CONSTRAINT fk_groups_products_product_id;
    ALTER TABLE groups_products DROP CONSTRAINT fk_groups_products_group_id;

    DROP TABLE groups;
    DROP TABLE products;
    DROP TABLE groups_products;
  `);
};
