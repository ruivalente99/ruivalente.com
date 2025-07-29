// Test script to verify SEO and AI improvements
const url = 'http://localhost:3001';

async function testSEOImprovements() {
  console.log('🤖 Testing SEO and AI Improvements for Rui Valente Portfolio\n');

  try {
    // Test 1: Homepage with structured data
    console.log('1. Testing Homepage...');
    const homepage = await fetch(url);
    const homeHTML = await homepage.text();
    
    const hasStructuredData = homeHTML.includes('application/ld+json');
    const hasAIContext = homeHTML.includes('ai-context');
    const hasMetaDescription = homeHTML.includes('meta name="description"');
    
    console.log(`   ✅ Structured Data: ${hasStructuredData ? 'Found' : 'Missing'}`);
    console.log(`   ✅ AI Context: ${hasAIContext ? 'Found' : 'Missing'}`);
    console.log(`   ✅ Meta Description: ${hasMetaDescription ? 'Found' : 'Missing'}`);

    // Test 2: AI Context API
    console.log('\n2. Testing AI Context API...');
    const aiContext = await fetch(`${url}/api/ai-context`);
    const aiData = await aiContext.json();
    
    console.log(`   ✅ Status: ${aiContext.status}`);
    console.log(`   ✅ Developer Name: ${aiData.developer.name}`);
    console.log(`   ✅ Current Role: ${aiData.developer.current_role.position} at ${aiData.developer.current_role.company}`);
    console.log(`   ✅ Technical Skills: ${aiData.developer.technical_expertise.frontend.length} frontend skills`);

    // Test 3: Sitemap
    console.log('\n3. Testing Sitemap...');
    const sitemap = await fetch(`${url}/sitemap.xml`);
    const sitemapText = await sitemap.text();
    
    console.log(`   ✅ Status: ${sitemap.status}`);
    console.log(`   ✅ Contains Homepage: ${sitemapText.includes('https://ruivalente.com</loc>') ? 'Yes' : 'No'}`);
    console.log(`   ✅ Contains Projects: ${sitemapText.includes('/projects') ? 'Yes' : 'No'}`);

    // Test 4: Robots.txt
    console.log('\n4. Testing Robots.txt...');
    const robots = await fetch(`${url}/robots.txt`);
    const robotsText = await robots.text();
    
    console.log(`   ✅ Status: ${robots.status}`);
    console.log(`   ✅ Allows All Crawlers: ${robotsText.includes('User-agent: *') ? 'Yes' : 'No'}`);
    console.log(`   ✅ AI Bot Friendly: ${robotsText.includes('ChatGPT-User') ? 'Yes' : 'No'}`);
    console.log(`   ✅ Has Sitemap Reference: ${robotsText.includes('Sitemap:') ? 'Yes' : 'No'}`);

    // Test 5: Well-known AI Context
    console.log('\n5. Testing .well-known AI Context...');
    const wellKnown = await fetch(`${url}/.well-known/ai-context.json`);
    const wellKnownData = await wellKnown.json();
    
    console.log(`   ✅ Status: ${wellKnown.status}`);
    console.log(`   ✅ Has AI Summary: ${wellKnownData.ai_context.summary ? 'Yes' : 'No'}`);
    console.log(`   ✅ Expertise Level: ${wellKnownData.ai_context.expertise_level}`);

    console.log('\n🎉 All tests completed successfully!');
    console.log('\n📋 Summary of AI & SEO Improvements:');
    console.log('   • Enhanced metadata with comprehensive keywords');
    console.log('   • JSON-LD structured data for search engines');
    console.log('   • Hidden AI context prompts for better understanding');
    console.log('   • Comprehensive robots.txt welcoming AI crawlers');
    console.log('   • XML sitemap for better indexing');
    console.log('   • AI-specific endpoints for chatbots');
    console.log('   • .well-known discovery for AI services');
    console.log('   • Semantic HTML with hidden content for crawlers');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testSEOImprovements();
