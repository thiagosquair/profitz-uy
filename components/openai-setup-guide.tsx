import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Bot, Key, Settings, CheckCircle } from "lucide-react"

export function OpenAISetupGuide() {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bot className="mr-2 h-5 w-5" />
          Enable Real AI Analysis
        </CardTitle>
        <CardDescription>
          Configure OpenAI API to get real AI-powered trade analysis instead of simulated results
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Settings className="h-4 w-4" />
          <AlertDescription>
            Currently using <Badge variant="secondary">Simulated AI Analysis</Badge> because OpenAI API key is not
            configured.
          </AlertDescription>
        </Alert>

        <div className="space-y-3">
          <h4 className="font-semibold flex items-center">
            <Key className="mr-2 h-4 w-4" />
            Setup Steps:
          </h4>

          <div className="space-y-2 text-sm">
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <strong>Get OpenAI API Key:</strong>
                <p className="text-gray-600">Visit openai.com/api and create an API key</p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <strong>Add Environment Variable:</strong>
                <p className="text-gray-600">Add OPENAI_API_KEY to your environment variables</p>
                <code className="block mt-1 p-2 bg-gray-100 rounded text-xs">OPENAI_API_KEY=your_api_key_here</code>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <strong>Restart Application:</strong>
                <p className="text-gray-600">Restart your development server to load the new environment variable</p>
              </div>
            </div>
          </div>
        </div>

        <Alert>
          <Bot className="h-4 w-4" />
          <AlertDescription>
            Once configured, you'll get real AI analysis powered by GPT-4o with vision capabilities that can actually
            "see" and analyze your TradingView charts!
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}
