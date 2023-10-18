-- migrate:up
CREATE TABLE IF NOT EXISTS public.warehouse_inventory (id uuid default gen_random_uuid() primary key, product_id character varying(255), quantity integer, shelf_location character varying(255), user_id uuid references auth.users (id) default auth.uid());
ALTER TABLE public.warehouse_inventory ENABLE ROW LEVEL SECURITY;
CREATE POLICY warehouse_inventory_policy ON public.warehouse_inventory FOR ALL USING (user_id = auth.uid());
-- migrate:down
DROP POLICY IF EXISTS warehouse_inventory_policy ON public.warehouse_inventory;
DROP TABLE IF EXISTS public.warehouse_inventory;
