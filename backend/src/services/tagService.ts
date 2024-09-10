import TagModel, {Tag} from "../models/tags";


export class TagService{
    async getAllTags(): Promise<Tag[]> {
        return await TagModel.find();
    }
    async getTagByName(tagName: string): Promise<Tag | null> {
        return await TagModel.findOne({ tagName: tagName });
    }

    async updateTagCount(tagName: string): Promise<Tag | null> {
        try {
            const normalizedTagName = tagName.toLowerCase();
            const tag = await TagModel.findOneAndUpdate(
                { tagName: normalizedTagName },
                { $inc: { count: 1 } },
                { new: true, upsert: true }
            );
            return tag;
        }
        catch (error:any) {
            console.error("Error updating tag count:", error.message);
            return null;
        }
    }

    async getTopTags(topN: number): Promise<Tag[]> {
        try {
            const topTags = await TagModel.find({}, { tagName: 1, count: 1 })
            .sort({ count: -1 })   // Sort by count in descending order
            .limit(topN)            // Limit the result to topN tags
            .lean();                // Return plain JavaScript objects

            return topTags;

        }
        catch (error:any) {
            console.error("Error fetching top tags:", error.message);
            return [];
        }
    }

    async deleteAll(): Promise<string> {
        try {
            await TagModel.deleteMany({});
            return "All tags deleted";
        }
        catch (error:any) {
            console.error("Error deleting tags:", error.message);
            return "Error deleting tags";
        }
    }
}