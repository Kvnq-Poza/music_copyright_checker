import axios from "axios";

let apiKey = process.env.YOUTUBE_API_KEY;
console.log("apiKey ", apiKey);
const BASE_URL = "https://www.googleapis.com/youtube/v3";
export class YoutubeService {
  // Keep only for MusicController bulk operations
  async getVideoLicense(videoId: string): Promise<any> {
    const url = `${BASE_URL}/videos?part=snippet,contentDetails&id=${videoId}&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      const data = response.data;

      if (data.items && data.items.length > 0) {
        const video = data.items[0];
        const license = video.contentDetails.licensedContent;
        const tags = video.snippet.tags || [];
        const categoryId = video.snippet.categoryId;
        const thumbnail =
          video.snippet.thumbnails?.high?.url ||
          video.snippet.thumbnails?.default?.url ||
          "";
        const title = video.snippet.title;

        // Fetch category name using category ID
        // const categoryUrl = `${BASE_URL}/videoCategories?part=snippet&id=${categoryId}&key=${apiKey}`;
        // const categoryResponse = await axios.get(categoryUrl);
        // const categoryData = categoryResponse.data;

        // let categoryName = 'Unknown';
        // if (categoryData.items && categoryData.items.length > 0) {
        //     categoryName = categoryData.items[0].snippet.title;
        // }
        const relatedVideos: [] = [];

        return {
          videoId,
          license,
          // category: categoryName,
          tags: tags,
          url: `https://youtube.com/embed/${videoId}`,
          title,
          thumbnail,
          relatedVideos,
        };
      }
    } catch (error: any) {
      console.error("Error fetching video details:", error.message);
      throw error;
    }
  }
}
