-- migrate:up
ALTER TABLE public.customers ADD COLUMN email character varying(255);
-- migrate:down
ALTER TABLE public.customers DROP COLUMN email;
