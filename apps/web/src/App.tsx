import { Button } from '@acme/ui';
import '@acme/ui/style.css';
import { useState } from 'react';

function App() {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        maxWidth: 800,
        margin: '40px auto',
        padding: '0 20px',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <h1>@acme/ui 组件测试台</h1>

      <section style={{ marginBottom: 32 }}>
        <h2>按钮变体</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2>尺寸</h2>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2>状态</h2>
        <div style={{ display: 'flex', gap: 12 }}>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
        </div>
      </section>

      <section>
        <h2>交互测试</h2>
        <p>点击次数：{count}</p>
        <Button
          variant="primary"
          loading={loading}
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              setCount(c => c + 1);
              setLoading(false);
            }, 1000);
          }}
        >
          点我 +1（模拟请求）
        </Button>
      </section>
    </div>
  );
}

export default App;
