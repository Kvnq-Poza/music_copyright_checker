import axios from "axios"

let apiKey = process.env.YOUTUBE_API_KEY
console.log("apiKey ",apiKey)
const BASE_URL = "https://www.googleapis.com/youtube/v3"
export class YoutubeService {
    async getVideos(query: string): Promise<any> {
        const url = `${BASE_URL}/search?part=snippet&type=video&q=${query}&key=${apiKey}`
        console.log(url)
        const response = await axios.get(url)
        return response.data
    }

    async getVideoDetails(videoId: string): Promise<any> {
        const url = `${BASE_URL}/videos?part=snippet&id=${videoId}&key=${apiKey}`
        const response = await axios.get(url)
        return response.data
    }
    // async getVideoLicense(videoId: string): Promise<any> {
    //     const url = `${BASE_URL}/videos?part=contentDetails&id=${videoId}&key=${apiKey}`
    //     const response = await axios.get(url)
    //     return response.data
    // }
    async  getVideoLicense(videoId: string): Promise<any> {
        const url = `${BASE_URL}/videos?part=snippet,contentDetails&id=${videoId}&key=${apiKey}`;
        try {
            const response = await axios.get(url);
            const data = response.data;
    
            if (data.items && data.items.length > 0) {
                const video = data.items[0];
                const license = video.contentDetails.licensedContent;
                const tags = video.snippet.tags || [];
                const categoryId = video.snippet.categoryId;
                const thumbnail = video.snippet.thumbnails?.high?.url || video.snippet.thumbnails?.default?.url || '';
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
                    relatedVideos
                };
            } else {
                throw new Error('No video details found.');
            }
        } catch (error: any) {
            console.error('Error fetching video details:', error.message);
            throw error;
        }
    }
    extractVideoId(url: string): string {
        const videoId = url.split("v=")[1]
        return videoId 
    }
    async getVideoLicenseByVideoName(videoName: string): Promise<any> {
        const API_KEY = apiKey;
        const searchUrl = `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(videoName)}&key=${API_KEY}&type=video`;
        let relatedVideos: any[] = [];
    
        try {
            // Fetch video ID by name
            const searchResponse = await axios.get(searchUrl);
            const searchData = searchResponse.data;
            console.log(searchData)
    
            if (searchData.items && searchData.items.length > 0) {
                const videoId = searchData.items[0].id.videoId;
    
                // Fetch video details including tags
                const detailsUrl = `${BASE_URL}/videos?part=snippet,contentDetails,status&id=${videoId}&key=${API_KEY}`;
                const detailsResponse = await axios.get(detailsUrl);
                const videoDetails = detailsResponse.data;
                
                for (let i = 1; i < searchData.items.length; i++) {
                    const video = searchData.items[i];
                    relatedVideos.push({
                        title: video.snippet.title,
                        videoId: video.id.videoId,
                        // channelTitle: video.snippet.channelTitle,
                        thumbnail: video.snippet.thumbnails?.high?.url || video.snippet.thumbnails?.default?.url || '',
                    });
                }
                console.log(relatedVideos)
    
                if (videoDetails.items && videoDetails.items.length > 0) {
                    const videoSnippet = videoDetails.items[0].snippet;
                    const videoContentDetails = videoDetails.items[0].contentDetails;
                    const videoStatus = videoDetails.items[0].status;
                    const privacyStatus = videoStatus.privacyStatus;



                    const thumbnail = videoSnippet.thumbnails?.high?.url || videoSnippet.thumbnails?.default?.url || '';
                    const title = videoSnippet.title;
    
                    const license = videoContentDetails.licensedContent;
                    const licenseType = videoStatus.license; // Standard YouTube License or Creative Commons
                    const categoryId = videoSnippet.categoryId;
                    const tags = videoSnippet.tags || []; // Get the tags
    
                    // Fetch category name using category ID
                    // const categoryUrl = `${BASE_URL}/videoCategories?part=snippet&id=${categoryId}&key=${API_KEY}`;
                    // const categoryResponse = await axios.get(categoryUrl);
                    // const categoryData = categoryResponse.data;
                    
    
                    // let categoryName = 'Unknown';
                    // if (categoryData.items && categoryData.items.length > 0) {
                    //     categoryName = categoryData.items[0].snippet.title;
                    // }

    
                    return {
                        videoId,
                        license,
                        licenseType,
                        privacyStatus,
                        // contentOwnerDetails,
                        // category: categoryName,
                        tags: tags, // Include tags in the response
                        url: `https://youtube.com/embed/${videoId}`,
                        thumbnail,
                        title,
                        relatedVideos
                    };
                } else {
                    throw new Error('No video details found.');
                }
            } else {
                throw new Error('No videos found.');
            }
        } catch (error: any) {
            console.error('Error fetching video details:', error.message);
            throw error;
        }
    }
    
    // async getVideoInfo(video_id:string): Promise <any> {
    //     const url = `${BASE_URL}/videos?`
    // }
}
