"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Package, 
  DollarSign, 
  ShoppingCart,
  Edit,
  Trash2,
  Plus,
  Search,
  Lock,
  LogOut
} from 'lucide-react'

interface Sale {
  id: number
  product: string
  client: string
  amount: number
  date: string
  status: string
}

interface Product {
  id: number
  name: string
  price: number
  stock: number
  category: string
}

interface Client {
  id: number
  name: string
  email: string
  phone: string
  city: string
}

interface DashboardMetric {
  id: number
  title: string
  value: string
  icon: React.ReactNode
  change: string
}

export default function AdminDashboard() {
  // Estado de autenticação
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const [loginError, setLoginError] = useState('')

  // Estados para dados
  const [sales, setSales] = useState<Sale[]>([
    { id: 1, product: "Refrigerante Coca-Cola 2L", client: "João Silva", amount: 150.00, date: "2024-01-15", status: "Concluída" },
    { id: 2, product: "Água Mineral 500ml", client: "Maria Santos", amount: 80.00, date: "2024-01-14", status: "Pendente" },
    { id: 3, product: "Suco Natural Laranja", client: "Pedro Costa", amount: 120.00, date: "2024-01-13", status: "Concluída" }
  ])

  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Refrigerante Coca-Cola 2L", price: 8.50, stock: 150, category: "Bebidas" },
    { id: 2, name: "Água Mineral 500ml", price: 2.00, stock: 300, category: "Bebidas" },
    { id: 3, name: "Suco Natural Laranja", price: 6.00, stock: 80, category: "Bebidas" }
  ])

  const [clients, setClients] = useState<Client[]>([
    { id: 1, name: "João Silva", email: "joao@email.com", phone: "(11) 99999-9999", city: "São Paulo" },
    { id: 2, name: "Maria Santos", email: "maria@email.com", phone: "(11) 88888-8888", city: "Rio de Janeiro" },
    { id: 3, name: "Pedro Costa", email: "pedro@email.com", phone: "(11) 77777-7777", city: "Belo Horizonte" }
  ])

  const [dashboardMetrics, setDashboardMetrics] = useState<DashboardMetric[]>([
    { id: 1, title: "Vendas Totais", value: "R$ 12.450", icon: <DollarSign className="h-4 w-4" />, change: "+12%" },
    { id: 2, title: "Produtos Vendidos", value: "1.234", icon: <Package className="h-4 w-4" />, change: "+8%" },
    { id: 3, title: "Clientes Ativos", value: "89", icon: <Users className="h-4 w-4" />, change: "+15%" },
    { id: 4, title: "Pedidos Hoje", value: "23", icon: <ShoppingCart className="h-4 w-4" />, change: "+5%" }
  ])

  // Estados para modais e edição
  const [editingSale, setEditingSale] = useState<Sale | null>(null)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [editingMetric, setEditingMetric] = useState<DashboardMetric | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Função de login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')

    if (loginData.username === 'jldistribuidoras' && loginData.password === 'JOSELUCAS') {
      setIsAuthenticated(true)
    } else {
      setLoginError('Usuário ou senha incorretos')
    }
  }

  // Função de logout
  const handleLogout = () => {
    setIsAuthenticated(false)
    setLoginData({ username: '', password: '' })
    setLoginError('')
  }

  // Funções para vendas
  const handleEditSale = (sale: Sale) => {
    setEditingSale(sale)
  }

  const handleSaveSale = (updatedSale: Sale) => {
    setSales(sales.map(sale => sale.id === updatedSale.id ? updatedSale : sale))
    setEditingSale(null)
  }

  const handleDeleteSale = (id: number) => {
    setSales(sales.filter(sale => sale.id !== id))
  }

  const handleAddSale = () => {
    const newSale: Sale = {
      id: Math.max(...sales.map(s => s.id)) + 1,
      product: "Novo Produto",
      client: "Novo Cliente",
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      status: "Pendente"
    }
    setSales([...sales, newSale])
    setEditingSale(newSale)
  }

  // Funções para produtos
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
  }

  const handleSaveProduct = (updatedProduct: Product) => {
    setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product))
    setEditingProduct(null)
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id))
  }

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: Math.max(...products.map(p => p.id)) + 1,
      name: "Novo Produto",
      price: 0,
      stock: 0,
      category: "Nova Categoria"
    }
    setProducts([...products, newProduct])
    setEditingProduct(newProduct)
  }

  // Funções para clientes
  const handleEditClient = (client: Client) => {
    setEditingClient(client)
  }

  const handleSaveClient = (updatedClient: Client) => {
    setClients(clients.map(client => client.id === updatedClient.id ? updatedClient : client))
    setEditingClient(null)
  }

  const handleDeleteClient = (id: number) => {
    setClients(clients.filter(client => client.id !== id))
  }

  const handleAddClient = () => {
    const newClient: Client = {
      id: Math.max(...clients.map(c => c.id)) + 1,
      name: "Novo Cliente",
      email: "email@exemplo.com",
      phone: "(00) 00000-0000",
      city: "Nova Cidade"
    }
    setClients([...clients, newClient])
    setEditingClient(newClient)
  }

  // Funções para métricas do dashboard
  const handleEditMetric = (metric: DashboardMetric) => {
    setEditingMetric(metric)
  }

  const handleSaveMetric = (updatedMetric: DashboardMetric) => {
    setDashboardMetrics(dashboardMetrics.map(metric => 
      metric.id === updatedMetric.id ? updatedMetric : metric
    ))
    setEditingMetric(null)
  }

  // Filtros de busca
  const filteredSales = sales.filter(sale => 
    sale.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.client.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.city.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Tela de Login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="bg-gray-800 border-gray-700 shadow-2xl">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mb-4">
                <Lock className="h-10 w-10 text-black" />
              </div>
              <CardTitle className="text-3xl font-bold text-yellow-400 mb-2">
                JL Distribuidoras
              </CardTitle>
              <p className="text-gray-400">Acesso ao Painel Administrativo</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-300">
                    Usuário
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={loginData.username}
                    onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                    className="bg-gray-700 border-gray-600 text-white focus:border-yellow-500 focus:ring-yellow-500"
                    placeholder="Digite seu usuário"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">
                    Senha
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    className="bg-gray-700 border-gray-600 text-white focus:border-yellow-500 focus:ring-yellow-500"
                    placeholder="Digite sua senha"
                    required
                  />
                </div>
                {loginError && (
                  <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-sm">
                    {loginError}
                  </div>
                )}
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold py-3 text-lg transition-all duration-200 transform hover:scale-105"
                >
                  Entrar
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Dashboard Principal (após login)
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center font-bold text-black text-xl">
                JL
              </div>
              <div>
                <h1 className="text-2xl font-bold text-yellow-400">JL Distribuidoras</h1>
                <p className="text-gray-400 text-sm">Painel Administrativo</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white w-64 focus:border-yellow-500"
                />
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800 border border-gray-700">
            <TabsTrigger 
              value="dashboard" 
              className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black text-gray-300"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="sales" 
              className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black text-gray-300"
            >
              Vendas
            </TabsTrigger>
            <TabsTrigger 
              value="products" 
              className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black text-gray-300"
            >
              Produtos
            </TabsTrigger>
            <TabsTrigger 
              value="clients" 
              className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black text-gray-300"
            >
              Clientes
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-yellow-400">Dashboard</h2>
            </div>

            {/* Métricas Editáveis */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardMetrics.map((metric) => (
                <Card key={metric.id} className="bg-gray-800 border-gray-700 hover:border-yellow-500/50 transition-colors shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-400">
                      {metric.title}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className="text-yellow-400">
                        {metric.icon}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditMetric(metric)}
                        className="h-6 w-6 p-0 text-yellow-400 hover:text-yellow-300 hover:bg-gray-700"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{metric.value}</div>
                    <p className="text-xs text-green-400">{metric.change} em relação ao mês anterior</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Gráfico de Vendas */}
            <Card className="bg-gray-800 border-gray-700 shadow-lg">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Vendas dos Últimos 7 Dias
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between space-x-2 bg-gray-900 rounded-lg p-4">
                  {[120, 150, 180, 200, 160, 220, 250].map((value, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2">
                      <div 
                        className="bg-gradient-to-t from-yellow-600 to-yellow-400 rounded-t"
                        style={{ height: `${(value / 250) * 200}px`, width: '40px' }}
                      />
                      <span className="text-xs text-gray-400">
                        {new Date(Date.now() - (6 - index) * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR', { weekday: 'short' })}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sales Tab */}
          <TabsContent value="sales" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-yellow-400">Vendas</h2>
              <Button onClick={handleAddSale} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <Plus className="mr-2 h-4 w-4" />
                Nova Venda
              </Button>
            </div>

            <div className="grid gap-4">
              {filteredSales.map((sale) => (
                <Card key={sale.id} className="bg-gray-800 border-gray-700 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-white">{sale.product}</h3>
                        <p className="text-gray-400">Cliente: {sale.client}</p>
                        <div className="flex items-center space-x-4">
                          <span className="text-yellow-400 font-bold">R$ {sale.amount.toFixed(2)}</span>
                          <span className="text-gray-400">{new Date(sale.date).toLocaleDateString('pt-BR')}</span>
                          <Badge variant={sale.status === 'Concluída' ? 'default' : 'secondary'}>
                            {sale.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditSale(sale)}
                          className="text-yellow-400 hover:text-yellow-300 hover:bg-gray-700"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteSale(sale.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-gray-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-yellow-400">Produtos</h2>
              <Button onClick={handleAddProduct} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <Plus className="mr-2 h-4 w-4" />
                Novo Produto
              </Button>
            </div>

            <div className="grid gap-4">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="bg-gray-800 border-gray-700 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                        <div className="flex items-center space-x-4">
                          <span className="text-yellow-400 font-bold">R$ {product.price.toFixed(2)}</span>
                          <span className="text-gray-400">Estoque: {product.stock}</span>
                          <Badge variant="outline" className="border-gray-600 text-gray-300">
                            {product.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditProduct(product)}
                          className="text-yellow-400 hover:text-yellow-300 hover:bg-gray-700"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-gray-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-yellow-400">Clientes</h2>
              <Button onClick={handleAddClient} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <Plus className="mr-2 h-4 w-4" />
                Novo Cliente
              </Button>
            </div>

            <div className="grid gap-4">
              {filteredClients.map((client) => (
                <Card key={client.id} className="bg-gray-800 border-gray-700 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-white">{client.name}</h3>
                        <div className="space-y-1">
                          <p className="text-gray-400">{client.email}</p>
                          <p className="text-gray-400">{client.phone}</p>
                          <p className="text-gray-400">{client.city}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditClient(client)}
                          className="text-yellow-400 hover:text-yellow-300 hover:bg-gray-700"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClient(client.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-gray-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal de Edição de Venda */}
      <Dialog open={!!editingSale} onOpenChange={() => setEditingSale(null)}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-yellow-400">Editar Venda</DialogTitle>
          </DialogHeader>
          {editingSale && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="product" className="text-gray-300">Produto</Label>
                <Input
                  id="product"
                  value={editingSale.product}
                  onChange={(e) => setEditingSale({...editingSale, product: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white focus:border-yellow-500"
                />
              </div>
              <div>
                <Label htmlFor="client" className="text-gray-300">Cliente</Label>
                <Input
                  id="client"
                  value={editingSale.client}
                  onChange={(e) => setEditingSale({...editingSale, client: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white focus:border-yellow-500"
                />
              </div>
              <div>
                <Label htmlFor="amount" className="text-gray-300">Valor</Label>
                <Input
                  id="amount"
                  type="number"
                  value={editingSale.amount}
                  onChange={(e) => setEditingSale({...editingSale, amount: parseFloat(e.target.value)})}
                  className="bg-gray-700 border-gray-600 text-white focus:border-yellow-500"
                />
              </div>
              <div>
                <Label htmlFor="date" className="text-gray-300">Data</Label>
                <Input
                  id="date"
                  type="date"
                  value={editingSale.date}
                  onChange={(e) => setEditingSale({...editingSale, date: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white focus:border-yellow-500"
                />
              </div>
              <div>
                <Label htmlFor="status" className="text-gray-300">Status</Label>
                <select
                  id="status"
                  value={editingSale.status}
                  onChange={(e) => setEditingSale({...editingSale, status: e.target.value})}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white focus:border-yellow-500"
                >
                  <option value="Pendente">Pendente</option>
                  <option value="Concluída">Concluída</option>
                  <option value="Cancelada">Cancelada</option>
                </select>
              </div>
              <Button 
                onClick={() => handleSaveSale(editingSale)}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                Salvar
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Edição de Produto */}
      <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-yellow-400">Editar Produto</DialogTitle>
          </DialogHeader>
          {editingProduct && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-gray-300">Nome</Label>
                <Input
                  id="name"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white focus:border-yellow-500"
                />
              </div>
              <div>
                <Label htmlFor="price" className="text-gray-300">Preço</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                  className="bg-gray-700 border-gray-600 text-white focus:border-yellow-500"
                />
              </div>
              <div>
                <Label htmlFor="stock" className="text-gray-300">Estoque</Label>
                <Input
                  id="stock"
                  type="number"
                  value={editingProduct.stock}
                  onChange={(e) => setEditingProduct({...editingProduct, stock: parseInt(e.target.value)})}
                  className="bg-gray-700 border-gray-600 text-white focus:border-yellow-500"
                />
              </div>
              <div>
                <Label htmlFor="category" className="text-gray-300">Categoria</Label>
                <Input
                  id="category"
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white focus:border-yellow-500"
                />
              </div>
              <Button 
                onClick={() => handleSaveProduct(editingProduct)}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                Salvar
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Edição de Cliente */}
      <Dialog open={!!editingClient} onOpenChange={() => setEditingClient(null)}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-yellow-400">Editar Cliente</DialogTitle>
          </DialogHeader>
          {editingClient && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="clientName" className="text-gray-300">Nome</Label>
                <Input
                  id="clientName"
                  value={editingClient.name}
                  onChange={(e) => setEditingClient({...editingClient, name: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white focus:border-yellow-500"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editingClient.email}
                  onChange={(e) => setEditingClient({...editingClient, email: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white focus:border-yellow-500"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-gray-300">Telefone</Label>
                <Input
                  id="phone"
                  value={editingClient.phone}
                  onChange={(e) => setEditingClient({...editingClient, phone: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white focus:border-yellow-500"
                />
              </div>
              <div>
                <Label htmlFor="city" className="text-gray-300">Cidade</Label>
                <Input
                  id="city"
                  value={editingClient.city}
                  onChange={(e) => setEditingClient({...editingClient, city: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white focus:border-yellow-500"
                />
              </div>
              <Button 
                onClick={() => handleSaveClient(editingClient)}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                Salvar
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Edição de Métrica do Dashboard */}
      <Dialog open={!!editingMetric} onOpenChange={() => setEditingMetric(null)}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-yellow-400">Editar Métrica</DialogTitle>
          </DialogHeader>
          {editingMetric && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="metricTitle" className="text-gray-300">Título</Label>
                <Input
                  id="metricTitle"
                  value={editingMetric.title}
                  onChange={(e) => setEditingMetric({...editingMetric, title: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white focus:border-yellow-500"
                />
              </div>
              <div>
                <Label htmlFor="metricValue" className="text-gray-300">Valor</Label>
                <Input
                  id="metricValue"
                  value={editingMetric.value}
                  onChange={(e) => setEditingMetric({...editingMetric, value: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white focus:border-yellow-500"
                />
              </div>
              <div>
                <Label htmlFor="metricChange" className="text-gray-300">Mudança (%)</Label>
                <Input
                  id="metricChange"
                  value={editingMetric.change}
                  onChange={(e) => setEditingMetric({...editingMetric, change: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white focus:border-yellow-500"
                />
              </div>
              <Button 
                onClick={() => handleSaveMetric(editingMetric)}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                Salvar
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}