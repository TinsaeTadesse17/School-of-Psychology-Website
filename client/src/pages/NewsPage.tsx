import React from 'react';
import { NewsEvent } from '@shared/schema';
import NewsCard from '../components/NewsCard';

// Dummy data for news and events
const dummyNews: NewsEvent[] = [
  {
    id: 1,
    title: 'Annual Psychology Research Symposium',
    content:
      'Join us for presentations of groundbreaking research from our faculty and graduate students in various psychology domains.',
    type: 'event',
    date: new Date().toISOString(),
    imageUrl:
      'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
    isPublic: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Department Welcomes New Faculty Member',
    content:
      'Dr. Sarah Teklu joins our faculty, bringing expertise in developmental psychology and cognitive development research.',
    type: 'news',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
    isPublic: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    title: 'Cognitive Psychology Winter Workshop',
    content:
      'Our cognitive psychology division is hosting a winter workshop on memory and learning strategies.',
    type: 'event',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    imageUrl:
      'https://images.unsplash.com/photo-1599687351724-dfa3c4ff81b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500',
    isPublic: true,
    createdAt: new Date().toISOString(),
  },
];

export default function NewsPage() {
  return (
    <div className="max-w-5xl mx-auto py-8">
      <h1 className="text-3xl font-heading font-semibold mb-6">News & Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dummyNews.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
