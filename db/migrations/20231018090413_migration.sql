-- migrate:up
INSERT INTO public.products (product_id, name, price, number_in_stock) VALUES ('1', 'Product1', 100.0, 50);
INSERT INTO public.products (product_id, name, price, number_in_stock) VALUES ('2', 'Product2', 200.0, 30);
INSERT INTO public.products (product_id, name, price, number_in_stock) VALUES ('3', 'Product3', 300.0, 20);
INSERT INTO public.products (product_id, name, price, number_in_stock) VALUES ('4', 'Product4', 400.0, 10);
-- migrate:down
DELETE FROM public.products WHERE product_id IN ('1', '2', '3', '4');
