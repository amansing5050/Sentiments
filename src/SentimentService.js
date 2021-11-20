const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");
const key = '47abb826db5c4c68bd2fa284573d6a95';
const endpoint = "https://mylanguageresourcegroup.cognitiveservices.azure.com/";

const textAnalyticsClient = new TextAnalyticsClient(endpoint,  new AzureKeyCredential(key));

export const getSentiment = async (inputSentence) => {
    return await sentimentAnalysisWithOpinionMining(textAnalyticsClient, inputSentence);
}

async function sentimentAnalysisWithOpinionMining(client, input){

    const sentimentInput = [
      {
        text: input,
        id: "0",
        language: "en"
      }
    ];
    const results = await client.analyzeSentiment(sentimentInput, { includeOpinionMining: true });
    return results;
}