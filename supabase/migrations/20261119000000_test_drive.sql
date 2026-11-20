-- Туршилтын жолоодлого: машин сонгох → 20,000₮ (Byl) → Cal.com цаг захиалга.

-- Аль машиныг туршуулж болохыг admin-аас удирдана
alter table public.product_cards
  add column test_drive boolean not null default false;

-- Туршилтын жолоодлогын захиалгад сонгосон машин, Cal.com-ын захиалга.
-- booked_at — Cal дээр сонгосон туршилтын цаг (эхлэх хугацаа).
alter table public.orders
  add column vehicle text,
  add column cal_booking_uid text unique,
  add column booked_at timestamptz;
