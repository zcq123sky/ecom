CREATE POLICY "anon_select_beverage" ON "beverage" AS PERMISSIVE FOR SELECT TO "anon" USING (true);--> statement-breakpoint
CREATE POLICY "anon_select_snack" ON "snack" AS PERMISSIVE FOR SELECT TO "anon" USING (true);--> statement-breakpoint
CREATE POLICY "anon_select_toy" ON "toy" AS PERMISSIVE FOR SELECT TO "anon" USING (true);