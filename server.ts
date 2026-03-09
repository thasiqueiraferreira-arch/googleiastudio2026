import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize SQLite Database
const db = new Database('sopa_premium.db');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS stores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    delivery_radius REAL NOT NULL,
    hours TEXT NOT NULL,
    status TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    image TEXT
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    image TEXT,
    rating REAL,
    FOREIGN KEY(category_id) REFERENCES categories(id)
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    store_id INTEGER,
    status TEXT NOT NULL,
    total REAL NOT NULL,
    delivery_fee REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(store_id) REFERENCES stores(id)
  );
  
  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    price REAL,
    FOREIGN KEY(order_id) REFERENCES orders(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
  );
`);

// Seed data if empty
const storeCount = db.prepare('SELECT COUNT(*) as count FROM stores').get() as { count: number };
if (storeCount.count === 0) {
  db.prepare(`INSERT INTO stores (name, address, delivery_radius, hours, status) VALUES (?, ?, ?, ?, ?)`).run(
    'Sopa Premium - Paulista', 'Av. Paulista, 1000 - Bela Vista', 5.0, '18:00 - 02:00', 'open'
  );
  db.prepare(`INSERT INTO stores (name, address, delivery_radius, hours, status) VALUES (?, ?, ?, ?, ?)`).run(
    'Sopa Premium - Moema', 'Av. Ibirapuera, 2000 - Moema', 4.0, '18:00 - 02:00', 'open'
  );

  const catSopas = db.prepare(`INSERT INTO categories (name, image) VALUES (?, ?)`).run('Sopas', 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop').lastInsertRowid;
  const catAcai = db.prepare(`INSERT INTO categories (name, image) VALUES (?, ?)`).run('Açaí', 'https://images.unsplash.com/photo-1590004953392-5aba2e72269a?q=80&w=800&auto=format&fit=crop').lastInsertRowid;
  const catMassas = db.prepare(`INSERT INTO categories (name, image) VALUES (?, ?)`).run('Massas', 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=800&auto=format&fit=crop').lastInsertRowid;

  const insertProduct = db.prepare(`INSERT INTO products (category_id, name, description, price, image, rating) VALUES (?, ?, ?, ?, ?, ?)`);
  
  // CATEGORIA 1 — SOPAS
  insertProduct.run(catSopas, 'Caldo Verde Premium', 'Tradicional sopa portuguesa cremosa feita com batatas, couve fresca e linguiça calabresa. Ingredientes: batata, couve, linguiça calabresa, alho, cebola e azeite.', 24.90, 'https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=800&auto=format&fit=crop', 4.8);
  insertProduct.run(catSopas, 'Sopa de Mandioquinha com Carne', 'Sopa cremosa de mandioquinha com carne desfiada, perfeita para noites frias. Ingredientes: mandioquinha, carne bovina desfiada, alho, cebola e cheiro verde.', 27.90, 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop', 4.9);
  insertProduct.run(catSopas, 'Sopa de Abóbora com Carne Seca', 'Sopa cremosa de abóbora com carne seca desfiada e toque especial de temperos. Ingredientes: abóbora, carne seca, cebola, alho e cheiro verde.', 28.90, 'https://images.unsplash.com/photo-1604152135912-00a022e86504?q=80&w=800&auto=format&fit=crop', 4.9);
  insertProduct.run(catSopas, 'Canja de Galinha Especial', 'Canja tradicional com frango desfiado, arroz e legumes frescos. Ingredientes: frango, arroz, cenoura, cebola, alho e salsinha.', 23.90, 'https://images.unsplash.com/photo-1548943487-a2e4f43b4850?q=80&w=800&auto=format&fit=crop', 4.7);
  insertProduct.run(catSopas, 'Sopa de Feijão com Bacon', 'Sopa encorpada de feijão com bacon crocante e temperos caseiros. Ingredientes: feijão, bacon, alho, cebola e temperos especiais.', 25.90, 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop', 4.8);
  insertProduct.run(catSopas, 'Sopa de Legumes Fit', 'Sopa leve e nutritiva com diversos legumes frescos. Ingredientes: cenoura, batata, abobrinha, chuchu, cebola e ervas.', 22.90, 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop', 4.6);
  insertProduct.run(catSopas, 'Creme de Milho com Frango', 'Creme suave de milho com frango desfiado e temperos especiais. Ingredientes: milho, frango, creme de leite, cebola e alho.', 26.90, 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop', 4.7);
  insertProduct.run(catSopas, 'Sopa de Lentilha com Calabresa', 'Sopa nutritiva de lentilha com linguiça calabresa e legumes. Ingredientes: lentilha, calabresa, cenoura, cebola e alho.', 27.90, 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop', 4.8);
  insertProduct.run(catSopas, 'Creme de Batata com Bacon', 'Creme de batata super cremoso com bacon crocante. Ingredientes: batata, bacon, creme de leite, alho e cebola.', 25.90, 'https://images.unsplash.com/photo-1604152135912-00a022e86504?q=80&w=800&auto=format&fit=crop', 4.9);
  insertProduct.run(catSopas, 'Sopa Mineira', 'Sopa tradicional mineira com feijão, macarrão, carne e legumes. Ingredientes: feijão, carne bovina, macarrão, cenoura e batata.', 29.90, 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop', 4.8);

  // CATEGORIA 2 — AÇAÍ
  insertProduct.run(catAcai, 'Açaí Tradicional 300ml', 'Açaí cremoso batido na hora. Ingredientes: açaí, banana e granola.', 14.90, 'https://images.unsplash.com/photo-1590004953392-5aba2e72269a?q=80&w=800&auto=format&fit=crop', 4.7);
  insertProduct.run(catAcai, 'Açaí Energético 400ml', 'Açaí com frutas e granola crocante. Ingredientes: açaí, morango, banana e granola.', 18.90, 'https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=800&auto=format&fit=crop', 4.8);
  insertProduct.run(catAcai, 'Açaí Premium 500ml', 'Açaí completo com diversos acompanhamentos. Ingredientes: açaí, leite condensado, granola, banana e morango.', 22.90, 'https://images.unsplash.com/photo-1590004953392-5aba2e72269a?q=80&w=800&auto=format&fit=crop', 4.9);
  insertProduct.run(catAcai, 'Açaí Fit', 'Açaí com frutas frescas sem açúcar. Ingredientes: açaí, banana, morango e chia.', 19.90, 'https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=800&auto=format&fit=crop', 4.8);
  insertProduct.run(catAcai, 'Açaí Supremo', 'Açaí super completo com vários toppings. Ingredientes: açaí, leite condensado, paçoca, granola, banana e morango.', 24.90, 'https://images.unsplash.com/photo-1590004953392-5aba2e72269a?q=80&w=800&auto=format&fit=crop', 5.0);

  // CATEGORIA 3 — MASSAS
  insertProduct.run(catMassas, 'Espaguete à Bolonhesa', 'Massa italiana com molho de carne tradicional. Ingredientes: espaguete, carne moída, molho de tomate e parmesão.', 29.90, 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?q=80&w=800&auto=format&fit=crop', 4.8);
  insertProduct.run(catMassas, 'Penne ao Molho Branco', 'Massa penne com molho branco cremoso. Ingredientes: penne, creme de leite, parmesão e noz moscada.', 28.90, 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=800&auto=format&fit=crop', 4.7);
  insertProduct.run(catMassas, 'Lasanha de Carne', 'Lasanha tradicional recheada com carne e queijo. Ingredientes: massa de lasanha, carne moída, molho de tomate e queijo.', 32.90, 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?q=80&w=800&auto=format&fit=crop', 4.9);
  insertProduct.run(catMassas, 'Talharim Alfredo', 'Talharim com molho cremoso de parmesão. Ingredientes: talharim, manteiga, creme de leite e parmesão.', 30.90, 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=800&auto=format&fit=crop', 4.8);
  insertProduct.run(catMassas, 'Espaguete ao Pesto', 'Massa com molho pesto de manjericão fresco. Ingredientes: espaguete, manjericão, azeite, alho e parmesão.', 31.90, 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=800&auto=format&fit=crop', 4.8);
}

// API Routes
app.get('/api/stores', (req, res) => {
  const stores = db.prepare('SELECT * FROM stores').all();
  res.json(stores);
});

app.get('/api/categories', (req, res) => {
  const categories = db.prepare('SELECT * FROM categories').all();
  res.json(categories);
});

app.get('/api/products', (req, res) => {
  const { category_id } = req.query;
  let products;
  if (category_id) {
    products = db.prepare('SELECT * FROM products WHERE category_id = ?').all(category_id);
  } else {
    products = db.prepare('SELECT * FROM products').all();
  }
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.post('/api/orders', (req, res) => {
  const { store_id, items, delivery_fee } = req.body;
  
  try {
    const insertOrder = db.prepare('INSERT INTO orders (user_id, store_id, status, total, delivery_fee) VALUES (?, ?, ?, ?, ?)');
    const insertItem = db.prepare('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)');
    
    let total = delivery_fee || 0;
    
    // Calculate total
    for (const item of items) {
      const product = db.prepare('SELECT price FROM products WHERE id = ?').get(item.product_id) as { price: number };
      total += product.price * item.quantity;
    }
    
    const info = insertOrder.run(1, store_id, 'pending', total, delivery_fee || 0);
    const orderId = info.lastInsertRowid;
    
    for (const item of items) {
      const product = db.prepare('SELECT price FROM products WHERE id = ?').get(item.product_id) as { price: number };
      insertItem.run(orderId, item.product_id, item.quantity, product.price);
    }
    
    res.json({ success: true, order_id: orderId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.get('/api/orders', (req, res) => {
  const orders = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
  res.json(orders);
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
