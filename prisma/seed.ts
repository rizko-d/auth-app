import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Data dummy users
  const users = [
    {
      email: 'admin@example.com',
      username: 'admin',
      password: 'Admin123',
    },
  ];

  console.log('🗑️  Cleaning existing data...');
  await prisma.user.deleteMany({});
  console.log('✅ Existing data cleaned');

  console.log('👥 Seeding users...');
  
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    
    await prisma.user.create({
      data: {
        email: user.email,
        username: user.username,
        password: hashedPassword,
      },
    });
    
    console.log(`   ✓ Created user: ${user.username} (${user.email})`);
  }

  console.log('✅ Users seeded successfully');
  
  // Tampilkan summary
  const totalUsers = await prisma.user.count();
  console.log(`\n📊 Summary:`);
  console.log(`   Total users in database: ${totalUsers}`);
  console.log('\n🎉 Seeding completed!\n');
  
  // Tampilkan login credentials
  console.log('🔐 Test Login Credentials:');
  console.log('─'.repeat(50));
  users.forEach(user => {
    console.log(`   Email: ${user.email}`);
    console.log(`   Password: ${user.password}`);
    console.log('─'.repeat(50));
  });
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
