-- Données de démonstration générées par scripts/generate-seed-sql.ts — ne pas éditer à la main.
-- Producteurs et certificats FICTIFS. Les images et PDF sont servis depuis /public.
begin;

insert into public.categories (id, slug, name, kind, description, position) values
  ('10000000-0000-4000-a000-000000000001', 'fleurs', 'Fleurs', 'cbd', 'Fleurs de chanvre françaises, séchées et affinées lentement.', 1),
  ('10000000-0000-4000-a000-000000000002', 'resines', 'Résines', 'cbd', 'Résines obtenues par tamisage à sec ou pression, selon des méthodes artisanales.', 2),
  ('10000000-0000-4000-a000-000000000003', 'huiles', 'Huiles', 'cbd', 'Huiles de chanvre à spectre complet ou large, en flacon compte-gouttes.', 3),
  ('10000000-0000-4000-a000-000000000004', 'infusions', 'Infusions', 'cbd', 'Mélanges de plantes et de chanvre pour des infusions parfumées.', 4),
  ('10000000-0000-4000-a000-000000000005', 'cosmetiques', 'Cosmétiques', 'cbd', 'Soins pour le corps formulés avec des extraits de chanvre.', 5),
  ('10000000-0000-4000-a000-000000000006', 'grinders', 'Grinders', 'accessoire', 'Grinders en aluminium, en bois ou en métal.', 6),
  ('10000000-0000-4000-a000-000000000007', 'vaporisateurs', 'Vaporisateurs', 'accessoire', 'Vaporisateurs pour herbes sèches.', 7),
  ('10000000-0000-4000-a000-000000000008', 'feuilles', 'Feuilles & filtres', 'accessoire', 'Feuilles non blanchies, filtres et tips.', 8),
  ('10000000-0000-4000-a000-000000000009', 'conservation', 'Boîtes de conservation', 'accessoire', 'Bocaux et boîtes pour conserver vos produits à l''abri de la lumière.', 9)
on conflict (id) do nothing;

insert into public.products (id, slug, name, category_id, short_description, description, cbd_rate, thc_rate, origin_region, producer, images, coa_url, tags, is_active, featured, created_at) values
  ('20000000-0000-4000-a000-000000000001', 'fleur-amnesia-du-luberon', 'Amnesia du Luberon', '10000000-0000-4000-a000-000000000001', 'Fleur cultivée en plein champ, notes citronnées et poivrées.', 'Cultivée en plein champ sur les coteaux du Luberon, cette fleur est récoltée à la main puis séchée lentement dans un séchoir ventilé. Ses têtes compactes dégagent un parfum de zeste de citron et de poivre blanc, avec une finale légèrement boisée.

Conditionnée en sachet opaque refermable pour préserver ses arômes.', 11.5, 0.19, 'Provence-Alpes-Côte d''Azur', 'Les Champs de Lure (fictif)', array['/products/fleur-amnesia-du-luberon.webp', '/products/fleur-amnesia-du-luberon-2.webp']::text[], '/coa/fleur-amnesia-du-luberon.pdf', array['plein champ', 'agrumes']::text[], true, true, '2026-01-01T00:00:00.000Z'),
  ('20000000-0000-4000-a000-000000000002', 'fleur-gorilla-des-cevennes', 'Gorilla des Cévennes', '10000000-0000-4000-a000-000000000001', 'Culture sous serre, arômes terreux et notes de pin.', 'Issue d''une culture sous serre à lumière naturelle dans les Cévennes, cette fleur présente des têtes denses et résineuses. Au nez : sous-bois, aiguilles de pin et une touche de cacao.

Séchage lent de trois semaines et affinage en bocal de verre.', 14.2, 0.24, 'Occitanie', 'Serres du Mont Aigoual (fictif)', array['/products/fleur-gorilla-des-cevennes.webp', '/products/fleur-gorilla-des-cevennes-2.webp']::text[], '/coa/fleur-gorilla-des-cevennes.pdf', array['sous serre', 'boisé']::text[], true, true, '2026-01-02T00:00:00.000Z'),
  ('20000000-0000-4000-a000-000000000003', 'fleur-harlequin-d-alsace', 'Harlequin d''Alsace', '10000000-0000-4000-a000-000000000001', 'Fleur indoor aux notes fruitées de mangue et de pêche.', 'Cultivée en intérieur par un petit producteur alsacien, cette fleur se distingue par ses notes fruitées (mangue, pêche blanche) et une texture aérée. Taillée à la main, sans pulvérisation ni ajout d''aucune sorte.', 9.8, 0.12, 'Grand Est', 'Ferme du Haut-Koenigsbourg (fictif)', array['/products/fleur-harlequin-d-alsace.webp', '/products/fleur-harlequin-d-alsace-2.webp']::text[], '/coa/fleur-harlequin-d-alsace.pdf', array['indoor', 'fruité']::text[], true, false, '2026-01-03T00:00:00.000Z'),
  ('20000000-0000-4000-a000-000000000004', 'resine-pollen-de-bretagne', 'Pollen de Bretagne', '10000000-0000-4000-a000-000000000002', 'Pollen tamisé à sec, texture friable et parfum épicé.', 'Obtenue par tamisage à sec de fleurs bretonnes, cette résine offre une texture friable et un parfum d''épices douces et de foin coupé. Pressée légèrement à froid, sans ajout d''aucune substance.', 22, 0.21, 'Bretagne', 'Chanvrière de l''Argoat (fictif)', array['/products/resine-pollen-de-bretagne.webp', '/products/resine-pollen-de-bretagne-2.webp']::text[], '/coa/resine-pollen-de-bretagne.pdf', array['tamisage à sec']::text[], true, true, '2026-01-04T00:00:00.000Z'),
  ('20000000-0000-4000-a000-000000000005', 'resine-ice-o-lator-des-alpes', 'Ice-O-Lator des Alpes', '10000000-0000-4000-a000-000000000002', 'Extraction à l''eau glacée, notes de résine de pin.', 'Extraite à l''eau glacée selon une méthode artisanale, cette résine savoyarde révèle des arômes de résine de pin et de miel de montagne. Consistance souple et malléable.', 28, 0.26, 'Auvergne-Rhône-Alpes', 'Alpages du Beaufortain (fictif)', array['/products/resine-ice-o-lator-des-alpes.webp', '/products/resine-ice-o-lator-des-alpes-2.webp']::text[], '/coa/resine-ice-o-lator-des-alpes.pdf', array['ice-o-lator']::text[], true, false, '2026-01-05T00:00:00.000Z'),
  ('20000000-0000-4000-a000-000000000006', 'huile-cbd-10-spectre-complet', 'Huile CBD 10 % spectre complet', '10000000-0000-4000-a000-000000000003', 'Extrait de chanvre français dans une huile de chanvre bio.', 'Extrait de chanvre à spectre complet dilué dans une huile de graines de chanvre biologique pressée à froid. Flacon en verre ambré avec pipette graduée.

Composition : huile de graines de chanvre (Cannabis sativa) biologique, extrait de chanvre.

Lire attentivement l''étiquette avant utilisation. Conserver à l''abri de la lumière et de la chaleur.', 10, 0.2, 'Nouvelle-Aquitaine', 'Huilerie du Périgord Vert (fictif)', array['/products/huile-cbd-10-spectre-complet.webp', '/products/huile-cbd-10-spectre-complet-2.webp']::text[], '/coa/huile-cbd-10-spectre-complet.pdf', array['bio', 'spectre complet']::text[], true, true, '2026-01-06T00:00:00.000Z'),
  ('20000000-0000-4000-a000-000000000007', 'huile-cbd-20-spectre-large', 'Huile CBD 20 % spectre large', '10000000-0000-4000-a000-000000000003', 'Spectre large, huile de tournesol française, goût neutre.', 'Extrait de chanvre à spectre large dilué dans une huile de tournesol française. Goût neutre, flacon en verre ambré de 10 ml avec pipette graduée.

Composition : huile de tournesol, extrait de chanvre.

Lire attentivement l''étiquette avant utilisation.', 20, 0, 'Centre-Val de Loire', 'Domaine de la Sologne (fictif)', array['/products/huile-cbd-20-spectre-large.webp', '/products/huile-cbd-20-spectre-large-2.webp']::text[], '/coa/huile-cbd-20-spectre-large.pdf', array['spectre large']::text[], true, false, '2026-01-07T00:00:00.000Z'),
  ('20000000-0000-4000-a000-000000000008', 'infusion-verveine-chanvre', 'Infusion Verveine & Chanvre', '10000000-0000-4000-a000-000000000004', 'Feuilles de chanvre, verveine citronnée et tilleul.', 'Mélange de feuilles de chanvre, de verveine citronnée et de tilleul cultivés dans la Drôme. Infuser 5 minutes dans une eau frémissante pour une tasse aux notes florales et citronnées.

Ingrédients : feuilles de chanvre, verveine, tilleul.', 1.5, 0.05, 'Auvergne-Rhône-Alpes', 'Jardins de la Drôme (fictif)', array['/products/infusion-verveine-chanvre.webp', '/products/infusion-verveine-chanvre-2.webp']::text[], '/coa/infusion-verveine-chanvre.pdf', array['infusion', 'plantes']::text[], true, true, '2026-01-08T00:00:00.000Z'),
  ('20000000-0000-4000-a000-000000000009', 'baume-corps-chanvre-lavande', 'Baume corps Chanvre & Lavande', '10000000-0000-4000-a000-000000000005', 'Baume nourrissant au beurre de karité et à la lavande de Provence.', 'Baume onctueux formulé à partir de beurre de karité, d''huile de chanvre et d''huile essentielle de lavande de Provence. Texture fondante, parfum délicatement floral.

Usage externe uniquement. Éviter le contour des yeux. Pot en verre de 50 ml.', 1, 0, 'Provence-Alpes-Côte d''Azur', 'Savonnerie du Ventoux (fictif)', array['/products/baume-corps-chanvre-lavande.webp', '/products/baume-corps-chanvre-lavande-2.webp']::text[], '/coa/baume-corps-chanvre-lavande.pdf', array['cosmétique', 'lavande']::text[], true, false, '2026-01-09T00:00:00.000Z'),
  ('20000000-0000-4000-a000-00000000000a', 'huile-de-massage-chanvre', 'Huile de massage au chanvre', '10000000-0000-4000-a000-000000000005', 'Huile sèche pour le corps, parfum d''amande douce.', 'Huile sèche pour le corps associant huile de chanvre, huile d''amande douce et vitamine E. Pénètre rapidement sans laisser de film gras.

Usage externe uniquement. Flacon pompe de 100 ml.', 0.5, 0, 'Normandie', 'Atelier du Bocage (fictif)', array['/products/huile-de-massage-chanvre.webp', '/products/huile-de-massage-chanvre-2.webp']::text[], '/coa/huile-de-massage-chanvre.pdf', array['cosmétique']::text[], true, false, '2026-01-10T00:00:00.000Z'),
  ('20000000-0000-4000-a000-00000000000b', 'grinder-aluminium-4-parties', 'Grinder aluminium 4 parties', '10000000-0000-4000-a000-000000000006', 'Aluminium anodisé, dents en losange, tamis à pollen.', 'Grinder en aluminium anodisé de 55 mm, 4 parties avec tamis inox et racloir inclus. Fermeture aimantée.', null, null, null, null, array['/products/grinder-aluminium-4-parties.webp', '/products/grinder-aluminium-4-parties-2.webp']::text[], null, array['aluminium']::text[], true, true, '2026-01-11T00:00:00.000Z'),
  ('20000000-0000-4000-a000-00000000000c', 'grinder-bois-d-olivier', 'Grinder en bois d''olivier', '10000000-0000-4000-a000-000000000006', 'Tourné à la main dans du bois d''olivier, 2 parties.', 'Grinder 2 parties tourné dans du bois d''olivier, dents métalliques et couvercle aimanté. Chaque pièce est unique.', null, null, 'Provence-Alpes-Côte d''Azur', 'Tournerie des Alpilles (fictif)', array['/products/grinder-bois-d-olivier.webp', '/products/grinder-bois-d-olivier-2.webp']::text[], null, array['bois', 'artisanal']::text[], true, false, '2026-01-12T00:00:00.000Z'),
  ('20000000-0000-4000-a000-00000000000d', 'vaporisateur-portable-herbes-seches', 'Vaporisateur portable herbes sèches', '10000000-0000-4000-a000-000000000007', 'Chauffe par convection, 4 niveaux de température, USB-C.', 'Vaporisateur portable pour herbes sèches, chauffe par convection, chambre en céramique et 4 réglages de température (170 à 210 °C). Batterie rechargeable en USB-C. Garantie 2 ans.', null, null, null, null, array['/products/vaporisateur-portable-herbes-seches.webp', '/products/vaporisateur-portable-herbes-seches-2.webp']::text[], null, array['électronique']::text[], true, true, '2026-01-13T00:00:00.000Z'),
  ('20000000-0000-4000-a000-00000000000e', 'feuilles-slim-non-blanchies', 'Feuilles slim non blanchies + filtres', '10000000-0000-4000-a000-000000000008', 'Papier non blanchi, gomme arabique, carnet de filtres carton.', 'Carnet de 32 feuilles slim non blanchies avec 32 filtres en carton non blanchi.', null, null, null, null, array['/products/feuilles-slim-non-blanchies.webp', '/products/feuilles-slim-non-blanchies-2.webp']::text[], null, array['papier']::text[], true, false, '2026-01-14T00:00:00.000Z'),
  ('20000000-0000-4000-a000-00000000000f', 'bocal-verre-anti-uv', 'Bocal en verre anti-UV', '10000000-0000-4000-a000-000000000009', 'Verre violet filtrant les UV, couvercle à vis hermétique.', 'Bocal en verre violet qui filtre la lumière visible et UV pour préserver les arômes. Couvercle à vis hermétique.', null, null, null, null, array['/products/bocal-verre-anti-uv.webp', '/products/bocal-verre-anti-uv-2.webp']::text[], null, array['verre']::text[], true, false, '2026-01-15T00:00:00.000Z'),
  ('20000000-0000-4000-a000-000000000010', 'boite-conservation-bambou', 'Boîte de conservation en bambou', '10000000-0000-4000-a000-000000000009', 'Bambou et verre, compartiment aimanté.', 'Boîte en bambou avec couvercle aimanté, compartiment intérieur en verre et plateau de préparation amovible.', null, null, null, null, array['/products/boite-conservation-bambou.webp', '/products/boite-conservation-bambou-2.webp']::text[], null, array['bambou']::text[], true, false, '2026-01-16T00:00:00.000Z')
on conflict (id) do nothing;

insert into public.product_variants (id, product_id, label, price_cents, stock, sku, position) values
  ('30000000-0000-4000-a000-000000000001', '20000000-0000-4000-a000-000000000001', '3 g', 1900, 40, 'AH-0001', 0),
  ('30000000-0000-4000-a000-000000000002', '20000000-0000-4000-a000-000000000001', '5 g', 3000, 25, 'AH-0002', 1),
  ('30000000-0000-4000-a000-000000000003', '20000000-0000-4000-a000-000000000001', '10 g', 5500, 12, 'AH-0003', 2),
  ('30000000-0000-4000-a000-000000000004', '20000000-0000-4000-a000-000000000002', '3 g', 2200, 30, 'AH-0004', 0),
  ('30000000-0000-4000-a000-000000000005', '20000000-0000-4000-a000-000000000002', '5 g', 3500, 20, 'AH-0005', 1),
  ('30000000-0000-4000-a000-000000000006', '20000000-0000-4000-a000-000000000002', '10 g', 6400, 8, 'AH-0006', 2),
  ('30000000-0000-4000-a000-000000000007', '20000000-0000-4000-a000-000000000003', '3 g', 1800, 50, 'AH-0007', 0),
  ('30000000-0000-4000-a000-000000000008', '20000000-0000-4000-a000-000000000003', '5 g', 2900, 30, 'AH-0008', 1),
  ('30000000-0000-4000-a000-000000000009', '20000000-0000-4000-a000-000000000003', '10 g', 5200, 15, 'AH-0009', 2),
  ('30000000-0000-4000-a000-00000000000a', '20000000-0000-4000-a000-000000000004', '1 g', 1100, 40, 'AH-0010', 0),
  ('30000000-0000-4000-a000-00000000000b', '20000000-0000-4000-a000-000000000004', '3 g', 3000, 25, 'AH-0011', 1),
  ('30000000-0000-4000-a000-00000000000c', '20000000-0000-4000-a000-000000000004', '5 g', 4600, 10, 'AH-0012', 2),
  ('30000000-0000-4000-a000-00000000000d', '20000000-0000-4000-a000-000000000005', '1 g', 1400, 25, 'AH-0013', 0),
  ('30000000-0000-4000-a000-00000000000e', '20000000-0000-4000-a000-000000000005', '3 g', 3900, 12, 'AH-0014', 1),
  ('30000000-0000-4000-a000-00000000000f', '20000000-0000-4000-a000-000000000006', '10 ml', 3900, 35, 'AH-0015', 0),
  ('30000000-0000-4000-a000-000000000010', '20000000-0000-4000-a000-000000000006', '30 ml', 9900, 15, 'AH-0016', 1),
  ('30000000-0000-4000-a000-000000000011', '20000000-0000-4000-a000-000000000007', '10 ml', 6900, 20, 'AH-0017', 0),
  ('30000000-0000-4000-a000-000000000012', '20000000-0000-4000-a000-000000000008', '30 g', 1200, 60, 'AH-0018', 0),
  ('30000000-0000-4000-a000-000000000013', '20000000-0000-4000-a000-000000000008', '80 g', 2800, 25, 'AH-0019', 1),
  ('30000000-0000-4000-a000-000000000014', '20000000-0000-4000-a000-000000000009', '50 ml', 2400, 30, 'AH-0020', 0),
  ('30000000-0000-4000-a000-000000000015', '20000000-0000-4000-a000-00000000000a', '100 ml', 2900, 20, 'AH-0021', 0),
  ('30000000-0000-4000-a000-000000000016', '20000000-0000-4000-a000-00000000000b', 'Vert sauge', 2200, 20, 'AH-0022', 0),
  ('30000000-0000-4000-a000-000000000017', '20000000-0000-4000-a000-00000000000b', 'Noir', 2200, 15, 'AH-0023', 1),
  ('30000000-0000-4000-a000-000000000018', '20000000-0000-4000-a000-00000000000c', 'Ø 50 mm', 3400, 8, 'AH-0024', 0),
  ('30000000-0000-4000-a000-000000000019', '20000000-0000-4000-a000-00000000000d', 'Graphite', 11900, 10, 'AH-0025', 0),
  ('30000000-0000-4000-a000-00000000001a', '20000000-0000-4000-a000-00000000000e', '1 carnet', 250, 200, 'AH-0026', 0),
  ('30000000-0000-4000-a000-00000000001b', '20000000-0000-4000-a000-00000000000e', 'Boîte de 24', 4800, 20, 'AH-0027', 1),
  ('30000000-0000-4000-a000-00000000001c', '20000000-0000-4000-a000-00000000000f', '100 ml', 1500, 30, 'AH-0028', 0),
  ('30000000-0000-4000-a000-00000000001d', '20000000-0000-4000-a000-00000000000f', '250 ml', 2100, 20, 'AH-0029', 1),
  ('30000000-0000-4000-a000-00000000001e', '20000000-0000-4000-a000-000000000010', 'Taille unique', 2900, 12, 'AH-0030', 0)
on conflict (id) do nothing;

commit;
