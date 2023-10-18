-- migrate:up
CREATE TABLE public.products ( id uuid DEFAULT gen_random_uuid() NOT NULL, product_id character varying(255), name character varying(255), price float, number_in_stock integer, PRIMARY KEY (id) ); ALTER TABLE public.products OWNER TO postgres;
-- migrate:down
DROP TABLE public.products;
