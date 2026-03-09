export const stores = [
  { id: 1, name: 'Sopa Premium - Paulista', address: 'Av. Paulista, 1000 - Bela Vista', delivery_radius: 5.0, hours: '18:00 - 02:00', status: 'open' },
  { id: 2, name: 'Sopa Premium - Moema', address: 'Av. Ibirapuera, 2000 - Moema', delivery_radius: 4.0, hours: '18:00 - 02:00', status: 'open' }
];

export const categories = [
  { id: 1, name: 'Sopas', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop' },
  { id: 2, name: 'Açaí', image: 'https://images.unsplash.com/photo-1590004953392-5aba2e72269a?q=80&w=800&auto=format&fit=crop' },
  { id: 3, name: 'Massas', image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=800&auto=format&fit=crop' }
];

export const products = [
  // Sopas
  { id: 1, category_id: 1, name: 'Caldo Verde Premium', description: 'Tradicional sopa portuguesa cremosa feita com batatas, couve fresca e linguiça calabresa. Ingredientes: batata, couve, linguiça calabresa, alho, cebola e azeite.', price: 24.90, image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=800&auto=format&fit=crop', rating: 4.8 },
  { id: 2, category_id: 1, name: 'Sopa de Mandioquinha com Carne', description: 'Sopa cremosa de mandioquinha com carne desfiada, perfeita para noites frias. Ingredientes: mandioquinha, carne bovina desfiada, alho, cebola e cheiro verde.', price: 27.90, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop', rating: 4.9 },
  { id: 3, category_id: 1, name: 'Sopa de Abóbora com Carne Seca', description: 'Sopa cremosa de abóbora com carne seca desfiada e toque especial de temperos. Ingredientes: abóbora, carne seca, cebola, alho e cheiro verde.', price: 28.90, image: 'https://images.unsplash.com/photo-1604152135912-00a022e86504?q=80&w=800&auto=format&fit=crop', rating: 4.9 },
  { id: 4, category_id: 1, name: 'Canja de Galinha Especial', description: 'Canja tradicional com frango desfiado, arroz e legumes frescos. Ingredientes: frango, arroz, cenoura, cebola, alho e salsinha.', price: 23.90, image: 'https://images.unsplash.com/photo-1548943487-a2e4f43b4850?q=80&w=800&auto=format&fit=crop', rating: 4.7 },
  { id: 5, category_id: 1, name: 'Sopa de Feijão com Bacon', description: 'Sopa encorpada de feijão com bacon crocante e temperos caseiros. Ingredientes: feijão, bacon, alho, cebola e temperos especiais.', price: 25.90, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop', rating: 4.8 },
  { id: 6, category_id: 1, name: 'Sopa de Legumes Fit', description: 'Sopa leve e nutritiva com diversos legumes frescos. Ingredientes: cenoura, batata, abobrinha, chuchu, cebola e ervas.', price: 22.90, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop', rating: 4.6 },
  { id: 7, category_id: 1, name: 'Creme de Milho com Frango', description: 'Creme suave de milho com frango desfiado e temperos especiais. Ingredientes: milho, frango, creme de leite, cebola e alho.', price: 26.90, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop', rating: 4.7 },
  { id: 8, category_id: 1, name: 'Sopa de Lentilha com Calabresa', description: 'Sopa nutritiva de lentilha com linguiça calabresa e legumes. Ingredientes: lentilha, calabresa, cenoura, cebola e alho.', price: 27.90, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop', rating: 4.8 },
  { id: 9, category_id: 1, name: 'Creme de Batata com Bacon', description: 'Creme de batata super cremoso com bacon crocante. Ingredientes: batata, bacon, creme de leite, alho e cebola.', price: 25.90, image: 'https://images.unsplash.com/photo-1604152135912-00a022e86504?q=80&w=800&auto=format&fit=crop', rating: 4.9 },
  { id: 10, category_id: 1, name: 'Sopa Mineira', description: 'Sopa tradicional mineira com feijão, macarrão, carne e legumes. Ingredientes: feijão, carne bovina, macarrão, cenoura e batata.', price: 29.90, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop', rating: 4.8 },

  // Açaí
  { id: 11, category_id: 2, name: 'Açaí Tradicional 300ml', description: 'Açaí cremoso batido na hora. Ingredientes: açaí, banana e granola.', price: 14.90, image: 'https://images.unsplash.com/photo-1590004953392-5aba2e72269a?q=80&w=800&auto=format&fit=crop', rating: 4.7 },
  { id: 12, category_id: 2, name: 'Açaí Energético 400ml', description: 'Açaí com frutas e granola crocante. Ingredientes: açaí, morango, banana e granola.', price: 18.90, image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=800&auto=format&fit=crop', rating: 4.8 },
  { id: 13, category_id: 2, name: 'Açaí Premium 500ml', description: 'Açaí completo com diversos acompanhamentos. Ingredientes: açaí, leite condensado, granola, banana e morango.', price: 22.90, image: 'https://images.unsplash.com/photo-1590004953392-5aba2e72269a?q=80&w=800&auto=format&fit=crop', rating: 4.9 },
  { id: 14, category_id: 2, name: 'Açaí Fit', description: 'Açaí com frutas frescas sem açúcar. Ingredientes: açaí, banana, morango e chia.', price: 19.90, image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=800&auto=format&fit=crop', rating: 4.8 },
  { id: 15, category_id: 2, name: 'Açaí Supremo', description: 'Açaí super completo com vários toppings. Ingredientes: açaí, leite condensado, paçoca, granola, banana e morango.', price: 24.90, image: 'https://images.unsplash.com/photo-1590004953392-5aba2e72269a?q=80&w=800&auto=format&fit=crop', rating: 5.0 },

  // Massas
  { id: 16, category_id: 3, name: 'Espaguete à Bolonhesa', description: 'Massa italiana com molho de carne tradicional. Ingredientes: espaguete, carne moída, molho de tomate e parmesão.', price: 29.90, image: 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?q=80&w=800&auto=format&fit=crop', rating: 4.8 },
  { id: 17, category_id: 3, name: 'Penne ao Molho Branco', description: 'Massa penne com molho branco cremoso. Ingredientes: penne, creme de leite, parmesão e noz moscada.', price: 28.90, image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=800&auto=format&fit=crop', rating: 4.7 },
  { id: 18, category_id: 3, name: 'Lasanha de Carne', description: 'Lasanha tradicional recheada com carne e queijo. Ingredientes: massa de lasanha, carne moída, molho de tomate e queijo.', price: 32.90, image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?q=80&w=800&auto=format&fit=crop', rating: 4.9 },
  { id: 19, category_id: 3, name: 'Talharim Alfredo', description: 'Talharim com molho cremoso de parmesão. Ingredientes: talharim, manteiga, creme de leite e parmesão.', price: 30.90, image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=800&auto=format&fit=crop', rating: 4.8 },
  { id: 20, category_id: 3, name: 'Espaguete ao Pesto', description: 'Massa com molho pesto de manjericão fresco. Ingredientes: espaguete, manjericão, azeite, alho e parmesão.', price: 31.90, image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=800&auto=format&fit=crop', rating: 4.8 }
];
