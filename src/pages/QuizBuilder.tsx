import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Trash2,
  GripVertical,
  Save,
  Send,
  Clock,
  CheckCircle,
  Circle,
  Square,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

type QuestionType = "multiple-choice" | "true-false" | "short-answer" | "essay";

interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  type: QuestionType;
  question: string;
  points: number;
  options?: QuestionOption[];
  correctAnswer?: string;
  explanation?: string;
}

const QuizBuilder = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    course: "",
    timeLimit: "60",
    passingScore: "70",
    shuffleQuestions: false,
    shuffleAnswers: false,
    showResults: true,
    allowRetake: false,
    maxAttempts: "1",
  });

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      type: "multiple-choice",
      question: "What is the capital of France?",
      points: 10,
      options: [
        { id: "1-1", text: "London", isCorrect: false },
        { id: "1-2", text: "Paris", isCorrect: true },
        { id: "1-3", text: "Berlin", isCorrect: false },
        { id: "1-4", text: "Madrid", isCorrect: false },
      ],
      explanation: "Paris is the capital and largest city of France.",
    },
  ]);

  const [selectedQuestion, setSelectedQuestion] = useState<string>("1");

  const addQuestion = (type: QuestionType) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type,
      question: "",
      points: 10,
      ...(type === "multiple-choice" && {
        options: [
          { id: `${Date.now()}-1`, text: "", isCorrect: false },
          { id: `${Date.now()}-2`, text: "", isCorrect: false },
        ],
      }),
    };
    setQuestions([...questions, newQuestion]);
    setSelectedQuestion(newQuestion.id);
  };

  const deleteQuestion = (questionId: string) => {
    setQuestions(questions.filter((q) => q.id !== questionId));
    if (selectedQuestion === questionId && questions.length > 1) {
      setSelectedQuestion(questions[0].id);
    }
  };

  const updateQuestion = (questionId: string, updates: Partial<Question>) => {
    setQuestions(
      questions.map((q) => (q.id === questionId ? { ...q, ...updates } : q))
    );
  };

  const addOption = (questionId: string) => {
    const question = questions.find((q) => q.id === questionId);
    if (!question || !question.options) return;

    const newOption: QuestionOption = {
      id: Date.now().toString(),
      text: "",
      isCorrect: false,
    };

    updateQuestion(questionId, {
      options: [...question.options, newOption],
    });
  };

  const updateOption = (
    questionId: string,
    optionId: string,
    updates: Partial<QuestionOption>
  ) => {
    const question = questions.find((q) => q.id === questionId);
    if (!question || !question.options) return;

    const updatedOptions = question.options.map((opt) =>
      opt.id === optionId ? { ...opt, ...updates } : opt
    );

    updateQuestion(questionId, { options: updatedOptions });
  };

  const deleteOption = (questionId: string, optionId: string) => {
    const question = questions.find((q) => q.id === questionId);
    if (!question || !question.options) return;

    updateQuestion(questionId, {
      options: question.options.filter((opt) => opt.id !== optionId),
    });
  };

  const generateWithAI = () => {
    toast({
      title: "AI Generation",
      description: "Generating quiz questions with AI...",
    });
    // TODO: Implement AI generation
  };

  const handleSave = () => {
    toast({
      title: "Quiz Saved",
      description: "Your quiz has been saved as a draft.",
    });
  };

  const handlePublish = () => {
    toast({
      title: "Quiz Published",
      description: "Students can now access this quiz.",
    });
    navigate("/teacher/courses");
  };

  const currentQuestion = questions.find((q) => q.id === selectedQuestion);
  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

  const questionTypeIcons = {
    "multiple-choice": CheckCircle,
    "true-false": Circle,
    "short-answer": Square,
    essay: Square,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quiz Builder</h1>
          <p className="text-muted-foreground">
            Create and manage quiz questions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={generateWithAI}>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate with AI
          </Button>
          <Button variant="outline" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button onClick={handlePublish}>
            <Send className="mr-2 h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>

      <Tabs defaultValue="questions">
        <TabsList>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Questions Tab */}
        <TabsContent value="questions" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Question List */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Questions ({questions.length})</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => addQuestion("multiple-choice")}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {questions.map((question, index) => {
                  const Icon = questionTypeIcons[question.type];
                  return (
                    <div
                      key={question.id}
                      className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedQuestion === question.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedQuestion(question.id)}
                    >
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                      <Icon className="h-4 w-4 text-primary" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {question.question || `Question ${index + 1}`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {question.points} pts
                        </p>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteQuestion(question.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}

                {questions.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground mb-4">
                      No questions yet
                    </p>
                    <Button size="sm" onClick={() => addQuestion("multiple-choice")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Question
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Question Editor */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>
                  {currentQuestion ? "Edit Question" : "Select a Question"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentQuestion && (
                  <>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Question Type</Label>
                        <Select
                          value={currentQuestion.type}
                          onValueChange={(value: QuestionType) =>
                            updateQuestion(currentQuestion.id, { type: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="multiple-choice">
                              Multiple Choice
                            </SelectItem>
                            <SelectItem value="true-false">True/False</SelectItem>
                            <SelectItem value="short-answer">
                              Short Answer
                            </SelectItem>
                            <SelectItem value="essay">Essay</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Points</Label>
                        <Input
                          type="number"
                          value={currentQuestion.points}
                          onChange={(e) =>
                            updateQuestion(currentQuestion.id, {
                              points: parseInt(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Question</Label>
                      <Textarea
                        value={currentQuestion.question}
                        onChange={(e) =>
                          updateQuestion(currentQuestion.id, {
                            question: e.target.value,
                          })
                        }
                        rows={3}
                        placeholder="Enter your question..."
                      />
                    </div>

                    {/* Multiple Choice Options */}
                    {currentQuestion.type === "multiple-choice" &&
                      currentQuestion.options && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label>Answer Options</Label>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => addOption(currentQuestion.id)}
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add Option
                            </Button>
                          </div>
                          {currentQuestion.options.map((option, index) => (
                            <div
                              key={option.id}
                              className="flex items-center gap-3"
                            >
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  name={`correct-${currentQuestion.id}`}
                                  checked={option.isCorrect}
                                  onChange={() => {
                                    // Set all to false first
                                    const updatedOptions =
                                      currentQuestion.options!.map((opt) => ({
                                        ...opt,
                                        isCorrect: false,
                                      }));
                                    // Then set selected to true
                                    updatedOptions[index].isCorrect = true;
                                    updateQuestion(currentQuestion.id, {
                                      options: updatedOptions,
                                    });
                                  }}
                                  className="h-4 w-4"
                                />
                              </div>
                              <Input
                                value={option.text}
                                onChange={(e) =>
                                  updateOption(
                                    currentQuestion.id,
                                    option.id,
                                    { text: e.target.value }
                                  )
                                }
                                placeholder={`Option ${index + 1}`}
                                className="flex-1"
                              />
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() =>
                                  deleteOption(currentQuestion.id, option.id)
                                }
                                disabled={currentQuestion.options!.length <= 2}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <p className="text-xs text-muted-foreground">
                            Select the radio button for the correct answer
                          </p>
                        </div>
                      )}

                    {/* True/False */}
                    {currentQuestion.type === "true-false" && (
                      <div className="space-y-2">
                        <Label>Correct Answer</Label>
                        <Select
                          value={currentQuestion.correctAnswer || "true"}
                          onValueChange={(value) =>
                            updateQuestion(currentQuestion.id, {
                              correctAnswer: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">True</SelectItem>
                            <SelectItem value="false">False</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    {/* Short Answer */}
                    {currentQuestion.type === "short-answer" && (
                      <div className="space-y-2">
                        <Label>Expected Answer (for reference)</Label>
                        <Input
                          value={currentQuestion.correctAnswer || ""}
                          onChange={(e) =>
                            updateQuestion(currentQuestion.id, {
                              correctAnswer: e.target.value,
                            })
                          }
                          placeholder="Sample correct answer..."
                        />
                        <p className="text-xs text-muted-foreground">
                          This will be manually graded
                        </p>
                      </div>
                    )}

                    {/* Essay */}
                    {currentQuestion.type === "essay" && (
                      <div className="rounded-lg bg-muted/50 p-4">
                        <p className="text-sm text-muted-foreground">
                          Essay questions will be manually graded. Provide clear
                          instructions in the question text.
                        </p>
                      </div>
                    )}

                    {/* Explanation */}
                    <div className="space-y-2">
                      <Label>Explanation (Optional)</Label>
                      <Textarea
                        value={currentQuestion.explanation || ""}
                        onChange={(e) =>
                          updateQuestion(currentQuestion.id, {
                            explanation: e.target.value,
                          })
                        }
                        rows={2}
                        placeholder="Provide an explanation for the correct answer..."
                      />
                      <p className="text-xs text-muted-foreground">
                        This will be shown to students after they answer
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Quiz Title</Label>
                  <Input
                    value={quizData.title}
                    onChange={(e) =>
                      setQuizData({ ...quizData, title: e.target.value })
                    }
                    placeholder="e.g., Week 3 Quiz"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={quizData.description}
                    onChange={(e) =>
                      setQuizData({ ...quizData, description: e.target.value })
                    }
                    rows={3}
                    placeholder="Brief description of the quiz..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Course</Label>
                  <Select
                    value={quizData.course}
                    onValueChange={(value) =>
                      setQuizData({ ...quizData, course: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cs301">
                        CS301 - Advanced Machine Learning
                      </SelectItem>
                      <SelectItem value="cs201">
                        CS201 - Data Structures
                      </SelectItem>
                      <SelectItem value="cs101">
                        CS101 - Intro to Programming
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quiz Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Time Limit (minutes)</Label>
                  <Input
                    type="number"
                    value={quizData.timeLimit}
                    onChange={(e) =>
                      setQuizData({ ...quizData, timeLimit: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Passing Score (%)</Label>
                  <Input
                    type="number"
                    value={quizData.passingScore}
                    onChange={(e) =>
                      setQuizData({ ...quizData, passingScore: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Maximum Attempts</Label>
                  <Select
                    value={quizData.maxAttempts}
                    onValueChange={(value) =>
                      setQuizData({ ...quizData, maxAttempts: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 attempt</SelectItem>
                      <SelectItem value="2">2 attempts</SelectItem>
                      <SelectItem value="3">3 attempts</SelectItem>
                      <SelectItem value="unlimited">Unlimited</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Advanced Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Shuffle Questions</p>
                    <p className="text-sm text-muted-foreground">
                      Randomize question order for each student
                    </p>
                  </div>
                  <Switch
                    checked={quizData.shuffleQuestions}
                    onCheckedChange={(checked) =>
                      setQuizData({ ...quizData, shuffleQuestions: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Shuffle Answers</p>
                    <p className="text-sm text-muted-foreground">
                      Randomize answer options for multiple choice
                    </p>
                  </div>
                  <Switch
                    checked={quizData.shuffleAnswers}
                    onCheckedChange={(checked) =>
                      setQuizData({ ...quizData, shuffleAnswers: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Show Results Immediately</p>
                    <p className="text-sm text-muted-foreground">
                      Students see their score right after submission
                    </p>
                  </div>
                  <Switch
                    checked={quizData.showResults}
                    onCheckedChange={(checked) =>
                      setQuizData({ ...quizData, showResults: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Allow Retake</p>
                    <p className="text-sm text-muted-foreground">
                      Let students retake the quiz multiple times
                    </p>
                  </div>
                  <Switch
                    checked={quizData.allowRetake}
                    onCheckedChange={(checked) =>
                      setQuizData({ ...quizData, allowRetake: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Summary */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-8">
              <div>
                <p className="text-sm text-muted-foreground">Total Questions</p>
                <p className="text-2xl font-bold">{questions.length}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Points</p>
                <p className="text-2xl font-bold">{totalPoints}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Time Limit</p>
                <p className="text-2xl font-bold flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {quizData.timeLimit} min
                </p>
              </div>
            </div>
            <div className="text-right">
              <Badge variant="secondary" className="mb-2">
                Draft
              </Badge>
              <p className="text-xs text-muted-foreground">
                Click publish when ready
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizBuilder;
