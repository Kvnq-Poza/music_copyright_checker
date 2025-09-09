const mongoose = require("mongoose");
const readline = require("readline");

// MongoDB connection
const DB_URI = process.env.DB_URI;

// Music schema (simplified)
const musicSchema = new mongoose.Schema({
  video_id: String,
  url: String,
  title: String,
  thumbnail: String,
  tags: [String],
  user_id: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Music = mongoose.model("Music", musicSchema);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function connectDB() {
  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
}

async function addMusicToCarousel() {
  console.log("\n=== Add Music to Carousel ===");

  const url = await askQuestion("Enter YouTube URL: ");
  const title = await askQuestion("Enter music title: ");
  const tags = await askQuestion("Enter tags (comma-separated): ");

  // Extract video ID from URL
  const videoId = extractVideoId(url);
  if (!videoId) {
    console.log("Invalid YouTube URL");
    return;
  }

  // Generate thumbnail URL
  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const musicData = {
    video_id: videoId,
    url: url,
    title: title,
    thumbnail: thumbnail,
    tags: tags.split(",").map((tag) => tag.trim()),
    user_id: "carousel",
  };

  try {
    const music = new Music(musicData);
    await music.save();
    console.log("✅ Music added to carousel successfully!");
  } catch (error) {
    console.error("❌ Error adding music:", error.message);
  }
}

async function listCarouselMusic() {
  console.log("\n=== Current Carousel Music ===");

  try {
    const music = await Music.find({ user_id: "carousel" })
      .sort({ createdAt: -1 })
      .limit(10);

    if (music.length === 0) {
      console.log("No music in carousel");
      return;
    }

    music.forEach((item, index) => {
      console.log(`${index + 1}. ${item.title}`);
      console.log(`   URL: ${item.url}`);
      console.log(`   Tags: ${item.tags.join(", ")}`);
      console.log(`   Added: ${item.createdAt.toLocaleDateString()}`);
      console.log("");
    });
  } catch (error) {
    console.error("❌ Error fetching music:", error.message);
  }
}

async function removeMusicFromCarousel() {
  console.log("\n=== Remove Music from Carousel ===");

  const videoId = await askQuestion("Enter video ID to remove: ");

  try {
    const result = await Music.deleteOne({
      video_id: videoId,
      user_id: "carousel",
    });

    if (result.deletedCount > 0) {
      console.log("✅ Music removed successfully!");
    } else {
      console.log("❌ Music not found");
    }
  } catch (error) {
    console.error("❌ Error removing music:", error.message);
  }
}

async function bulkAddMusic() {
  console.log("\n=== Bulk Add Music ===");
  console.log("Enter YouTube URLs (one per line, empty line to finish):");

  const urls = [];
  let url;

  while (true) {
    url = await askQuestion("URL: ");
    if (!url.trim()) break;
    urls.push(url.trim());
  }

  if (urls.length === 0) {
    console.log("No URLs provided");
    return;
  }

  console.log(`\nProcessing ${urls.length} URLs...`);

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const videoId = extractVideoId(url);

    if (!videoId) {
      console.log(`❌ Invalid URL: ${url}`);
      continue;
    }

    // Check if already exists
    const existing = await Music.findOne({ video_id: videoId });
    if (existing) {
      console.log(`⚠️  Already exists: ${videoId}`);
      continue;
    }

    const musicData = {
      video_id: videoId,
      url: url,
      title: `Music ${videoId}`, // Default title
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      tags: ["Background"],
      user_id: "carousel",
    };

    try {
      const music = new Music(musicData);
      await music.save();
      console.log(`✅ Added: ${videoId}`);
    } catch (error) {
      console.log(`❌ Error adding ${videoId}: ${error.message}`);
    }
  }

  console.log("\nBulk add completed!");
}

function extractVideoId(url) {
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function showMenu() {
  console.log("\n=== Carousel Management ===");
  console.log("1. Add single music");
  console.log("2. List carousel music");
  console.log("3. Remove music");
  console.log("4. Bulk add music");
  console.log("5. Exit");

  const choice = await askQuestion("\nSelect option (1-5): ");

  switch (choice) {
    case "1":
      await addMusicToCarousel();
      break;
    case "2":
      await listCarouselMusic();
      break;
    case "3":
      await removeMusicFromCarousel();
      break;
    case "4":
      await bulkAddMusic();
      break;
    case "5":
      console.log("Goodbye!");
      rl.close();
      process.exit(0);
    default:
      console.log("Invalid option");
  }

  await showMenu();
}

async function main() {
  await connectDB();
  console.log("🎵 Carousel Update Script");
  await showMenu();
}

main().catch(console.error);
