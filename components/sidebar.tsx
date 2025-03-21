"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAnalytics } from "@/hooks/use-analytics"

// Inspirational quotes list
const inspirationalQuotes = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Life is what happens when you're busy making other plans. - John Lennon",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "It does not matter how slowly you go as long as you do not stop. - Confucius",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt",
  "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
  "The way to get started is to quit talking and begin doing. - Walt Disney",
  "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
  "If life were predictable it would cease to be life, and be without flavor. - Eleanor Roosevelt",
  "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success. - James Cameron",
  "Life is really simple, but we insist on making it complicated. - Confucius",
  "The best time to plant a tree was 20 years ago. The second best time is now. - Chinese Proverb",
  "You miss 100% of the shots you don't take. - Wayne Gretzky",
  "Whether you think you can or you think you can't, you're right. - Henry Ford",
  "I have not failed. I've just found 10,000 ways that won't work. - Thomas Edison",
  "The only impossible journey is the one you never begin. - Tony Robbins",
  "In the end, it's not the years in your life that count. It's the life in your years. - Abraham Lincoln",
  "Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll",
  "You only live once, but if you do it right, once is enough. - Mae West",
  "Many of life's failures are people who did not realize how close they were to success when they gave up. - Thomas Edison",
  "The mind is everything. What you think you become. - Buddha",
  "The best revenge is massive success. - Frank Sinatra",
  "People who are crazy enough to think they can change the world are the ones who do. - Rob Siltanen",
  "Failure will never overtake me if my determination to succeed is strong enough. - Og Mandino",
  "We may encounter many defeats but we must not be defeated. - Maya Angelou",
  "Knowing is not enough; we must apply. Wishing is not enough; we must do. - Johann Wolfgang von Goethe",
  "Imagine your life is perfect in every respect; what would it look like? - Brian Tracy",
  "We generate fears while we sit. We overcome them by action. - Dr. Henry Link",
  "Security is mostly a superstition. Life is either a daring adventure or nothing. - Helen Keller",
  "The man who has confidence in himself gains the confidence of others. - Hasidic Proverb",
  "The only true wisdom is in knowing you know nothing. - Socrates",
  "What you seek is seeking you. - Rumi",
  "Don't judge each day by the harvest you reap but by the seeds that you plant. - Robert Louis Stevenson",
  "Do what you can, with what you have, where you are. - Theodore Roosevelt",
  "If opportunity doesn't knock, build a door. - Milton Berle",
  "Happiness is not something ready-made. It comes from your own actions. - Dalai Lama",
  "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
  "Try not to become a man of success. Rather become a man of value. - Albert Einstein",
  "Everything you've ever wanted is on the other side of fear. - George Addair",
  "Success is walking from failure to failure with no loss of enthusiasm. - Winston Churchill",
  "You become what you believe. - Oprah Winfrey",
  "A person who never made a mistake never tried anything new. - Albert Einstein",
  "The question isn't who is going to let me; it's who is going to stop me. - Ayn Rand",
  "Too many of us are not living our dreams because we are living our fears. - Les Brown",
  "Challenges are what make life interesting and overcoming them is what makes life meaningful. - Joshua J. Marine",
  "If you want to lift yourself up, lift up someone else. - Booker T. Washington",
  "I didn't fail the test. I just found 100 ways to do it wrong. - Benjamin Franklin",
  "If you're offered a seat on a rocket ship, don't ask what seat! Just get on. - Sheryl Sandberg",
  "I attribute my success to this: I never gave or took any excuse. - Florence Nightingale",
  "I would rather die of passion than of boredom. - Vincent van Gogh",
  "If you look at what you have in life, you'll always have more. - Oprah Winfrey",
  "Dreaming, after all, is a form of planning. - Gloria Steinem",
  "Whatever the mind of man can conceive and believe, it can achieve. - Napoleon Hill",
  "First, have a definite, clear practical ideal; a goal, an objective. Second, have the necessary means to achieve your ends; wisdom, money, materials, and methods. Third, adjust all your means to that end. - Aristotle",
  "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do. - Mark Twain",
  "When I dare to be powerful, to use my strength in the service of my vision, then it becomes less and less important whether I am afraid. - Audre Lorde",
  "Great minds discuss ideas; average minds discuss events; small minds discuss people. - Eleanor Roosevelt",
  "The successful warrior is the average man, with laser-like focus. - Bruce Lee",
  "A successful man is one who can lay a firm foundation with the bricks others have thrown at him. - David Brinkley",
  "Those who dare to fail miserably can achieve greatly. - John F. Kennedy",
  "I can't change the direction of the wind, but I can adjust my sails to always reach my destination. - Jimmy Dean",
  "If you want to make your dreams come true, the first thing you have to do is wake up. - J.M. Power",
  "I alone cannot change the world, but I can cast a stone across the water to create many ripples. - Mother Teresa",
  "Nothing is impossible, the word itself says, 'I'm possible!' - Audrey Hepburn",
  "The only person you are destined to become is the person you decide to be. - Ralph Waldo Emerson",
  "Go confidently in the direction of your dreams. Live the life you have imagined. - Henry David Thoreau",
  "When you reach the end of your rope, tie a knot in it and hang on. - Franklin D. Roosevelt",
  "Always remember that you are absolutely unique. Just like everyone else. - Margaret Mead",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  "The best and most beautiful things in this world cannot be seen or even heard, but must be felt with the heart. - Helen Keller",
  "Believe in yourself, take on your challenges, dig deep within yourself to conquer fears. - Chantal Sutherland",
  "Whoever is happy will make others happy too. - Anne Frank",
  "You don't always need a plan. Sometimes you just need to breathe, trust, let go and see what happens. - Mandy Hale",
  "When one door of happiness closes, another opens; but often we look so long at the closed door that we do not see the one which has been opened for us. - Helen Keller",
  "Love yourself first and everything else falls into line. - Lucille Ball",
  "It is during our darkest moments that we must focus to see the light. - Aristotle",
  "Be yourself; everyone else is already taken. - Oscar Wilde",
  "You will face many defeats in life, but never let yourself be defeated. - Maya Angelou",
  "In the middle of difficulty lies opportunity. - Albert Einstein",
  "The purpose of our lives is to be happy. - Dalai Lama",
  "You may only succeed if you desire succeeding; you may only fail if you do not mind failing. - Philippos",
  "Courage is grace under pressure. - Ernest Hemingway",
  "If you cannot do great things, do small things in a great way. - Napoleon Hill",
  "If you don't like something, change it. If you can't change it, change your attitude. - Maya Angelou",
  "Setting goals is the first step in turning the invisible into the visible. - Tony Robbins",
  "With the new day comes new strength and new thoughts. - Eleanor Roosevelt",
  "Ever tried. Ever failed. No matter. Try Again. Fail again. Fail better. - Samuel Beckett",
  "Start where you are. Use what you have. Do what you can. - Arthur Ashe",
  "Don't let yesterday take up too much of today. - Will Rogers",
  "It's not whether you get knocked down, it's whether you get up. - Vince Lombardi",
  "The only place where success comes before work is in the dictionary. - Vidal Sassoon",
  "Hardships often prepare ordinary people for an extraordinary destiny. - C.S. Lewis",
  "Believe in yourself, and the rest will fall into place. - Brad Henry",
  "Your talent is God's gift to you. What you do with it is your gift back to God. - Leo Buscaglia",
  "Change your thoughts and you change your world. - Norman Vincent Peale",
  "The journey of a thousand miles begins with one step. - Lao Tzu"
];

export default function Sidebar() {
  // Randomly select an inspirational quote
  const [inspirationalQuote, setInspirationalQuote] = useState("");
  
  // 使用分析钩子
  const { trackButtonClick } = useAnalytics();
  
  useEffect(() => {
    // Randomly select a quote
    const randomIndex = Math.floor(Math.random() * inspirationalQuotes.length);
    setInspirationalQuote(inspirationalQuotes[randomIndex]);
  }, []);
  
  // Restart game function
  const restartGame = () => {
    // 跟踪重启游戏事件
    trackButtonClick('restart_game');
    
    // Get game iframe and reload it
    const gameIframe = document.querySelector('iframe');
    
    // Change the inspirational quote
    const randomIndex = Math.floor(Math.random() * inspirationalQuotes.length);
    setInspirationalQuote(inspirationalQuotes[randomIndex]);
    
    // Reload the game
    if (gameIframe && gameIframe.contentWindow) {
      gameIframe.src = gameIframe.src;
    } else {
      // If iframe not found, reload the entire page
      window.location.reload();
    }
  }

  return (
    <div className="w-full md:w-80 space-y-4 md:border-l border-[#00F3FF]/20 md:pl-4 mt-4 md:mt-0">
      <Card className="bg-[#1A1A24] border-[#00F3FF]/20 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-[#00F3FF] flex items-center gap-2 font-heading">
            <AlertTriangle className="h-5 w-5 text-[#FF4657]" />
            Game Rules
          </CardTitle>
          <CardDescription className="text-gray-400">Master these to survive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm flex items-start gap-2">
            <span className="text-[#00F3FF] font-bold">1.</span>
            <span>Avoid all oncoming vehicles to stay alive</span>
          </p>
          <p className="text-sm flex items-start gap-2">
            <span className="text-[#00F3FF] font-bold">2.</span>
            <span>It's hard to control the car in the raining weather</span>
          </p>
          <p className="text-sm flex items-start gap-2">
            <span className="text-[#00F3FF] font-bold">3.</span>
            <span>Use emergency brake sparingly</span>
          </p>
        </CardContent>
      </Card>

      <Card className="bg-[#1A1A24] border-[#00F3FF]/20 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-[#00F3FF] font-heading flex items-center gap-2">
            <Trophy className="h-5 w-5 text-[#FFD700]" />
            Quote of the Day
          </CardTitle>
          <CardDescription className="text-gray-400">Words of wisdom</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-3 bg-[#131318] rounded-md border border-[#00F3FF]/20">
            <div className="text-sm text-white font-medium italic">{inspirationalQuote}</div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#1A1A24] border-[#00F3FF]/20 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-[#00F3FF] font-heading">Controls</CardTitle>
          <CardDescription className="text-gray-400">Game settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={restartGame}
            className="w-full bg-[#FF4657] hover:bg-[#FF4657]/80 text-white"
          >
            Restart Game
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

