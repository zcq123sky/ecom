import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Header } from '@/components/Header';
import { ProductDisplay } from '@/components/ProductDisplay';
import { ControlPanel } from '@/components/ControlPanel';
import { DispensingArea } from '@/components/DispensingArea';
import { useProducts } from '@/data/products';

export const Route = createFileRoute('/_appLayout/')({
  component: IndexPage,
})

function IndexPage() {
  const { data: products, isLoading } = useProducts();
  const [amount, setAmount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [hasDispensed, setHasDispensed] = useState(false);
  const [dispensedProduct, setDispensedProduct] = useState<string | undefined>();

  const handleInsertCoin = () => {
    setAmount((prev) => prev + 1);
  };

  const handleReturnCoin = () => {
    setAmount(0);
  };

  const handlePullLever = () => {
    if (selectedProduct === null || !products) return;
    const product = products.find((p) => p.id === selectedProduct);
    if (!product || amount < product.price) return;

    setAmount((prev) => prev - product.price);
    setDispensedProduct(product.emoji + ' ' + product.name);
    setHasDispensed(true);
    setSelectedProduct(null);

    setTimeout(() => {
      setHasDispensed(false);
      setDispensedProduct(undefined);
    }, 5000);
  };

  const handleSelectProduct = (id: number) => {
    setSelectedProduct((prev) => (prev === id ? null : id));
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen text-text-muted">加载中...</div>;
  }

  return (
    <div className="w-[1440px] mx-auto bg-bg-white">
      <Header />

      <div className="flex min-h-[calc(100vh-80px)]">
        <ProductDisplay
          products={products ?? []}
          selectedProduct={selectedProduct}
          onSelectProduct={handleSelectProduct}
        />
        <ControlPanel
          amount={amount}
          onInsertCoin={handleInsertCoin}
          onPullLever={handlePullLever}
          onReturnCoin={handleReturnCoin}
        />
      </div>

      <DispensingArea
        hasDispensed={hasDispensed}
        dispensedProduct={dispensedProduct}
      />
    </div>
  );
}
