-- migrate:up
CREATE TABLE public.customers (id uuid DEFAULT gen_random_uuid() NOT NULL, name character varying(255), created_at timestamp with time zone, updated_at timestamp with time zone);
ALTER TABLE ONLY public.customers ADD CONSTRAINT customers_pkey PRIMARY KEY (id);
CREATE TABLE public.orders (id uuid DEFAULT gen_random_uuid() NOT NULL, order_date timestamp with time zone, status character varying(255), customer_id uuid DEFAULT auth.uid());
ALTER TABLE only public.orders ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.orders ADD CONSTRAINT orders_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id);
CREATE TABLE public.order_items (id uuid DEFAULT gen_random_uuid() NOT NULL, order_id uuid, product_id character varying(255), quantity integer);
ALTER TABLE ONLY public.order_items ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.order_items ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY orders_policy ON public.orders USING ((customer_id = auth.uid()));
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY order_items_policy ON public.order_items USING ((order_id IN (SELECT id from public.orders where customer_id = auth.uid())));
-- migrate:down
DROP TABLE public.order_items;
DROP TABLE public.orders;
DROP TABLE public.customers;
