import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';

// Mapeamento de rotas e as roles que têm acesso a cada uma
const ACESSO = {
  dashboard: ['admin', 'user'],
  painel: ['admin'],
  relatorios: ['admin', 'gerente'],
};

export default async function Home() {
  const user = await currentUser();

  const rotas = Object.keys(ACESSO).filter((rota) =>
    ACESSO[rota].includes(user?.publicMetadata?.role)
  );

  return (
    <main className="card">
      {!user ? (
        <>
          <h1>Faça login</h1>
          <SignInButton mode="modal">
            <button className="btn">Entrar</button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="btn">Criar Conta</button>
          </SignUpButton>
        </>
      ) : (
        <>
          <UserButton
            appearance={{
              elements: { avatarBox: { width: 150, height: 150 } },
            }}
          />
          <h1>{rotas.length ? 'Escolha seu acesso' : 'Sem acesso'}</h1>

          {rotas.map((rota) => (
            <Link key={rota} className="btn" href={`/${rota}`}>
              {rota}
            </Link>
          ))}
        </>
      )}
    </main>
  );
}