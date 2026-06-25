import React, { useState } from 'react';
import { useAI } from '../hooks/useAI';
import SummaryResult from '../components/ai/SummaryResult';
import FlashcardDeck from '../components/ai/FlashcardDeck';
import QuizMode from '../components/ai/QuizMode';
import Spinner from '../components/ui/Spinner';
import toast from 'react-hot-toast';
import { Bell, Sparkles, Send, Library, AlertTriangle, FileText, CheckSquare } from 'lucide-react';
import { parsePhoneList } from '../utils/phone';

export default function NoticePage() {
  const [activeTab, setActiveTab] = useState('notice'); // 'notice' | 'flashcards' | 'quiz'
  const { loading, summarizeNotice, generateFlashcards, generateMCQs } = useAI();

  // Notice summarizer state
  const [noticeText, setNoticeText] = useState('');
  const [summaryData, setSummaryData] = useState(null);
  const [phoneInput, setPhoneInput] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Flashcards state
  const [lectureNotes, setLectureNotes] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [notesError, setNotesError] = useState('');

  // Quiz Mode state
  const [quizNotes, setQuizNotes] = useState('');
  const [quizSubject, setQuizSubject] = useState('');
  const [quizTopic, setQuizTopic] = useState('');
  const [mcqs, setMcqs] = useState([]);
  const [quizError, setQuizError] = useState('');

  // Handle notice summarization
  const handleSummarize = async () => {
    if (!noticeText.trim()) {
      toast.error('Please enter college notice content.');
      return;
    }
    setPhoneError('');
    try {
      const result = await summarizeNotice(noticeText);
      setSummaryData(result);
      toast.success('AI summary generated successfully! ✨');
    } catch (err) {
      // toast shown inside useAI hook
    }
  };

  // Handle WhatsApp broadcast triggering
  const handleBroadcast = async () => {
    if (!summaryData) {
      toast.error('Generate summary first.');
      return;
    }
    if (!phoneInput.trim()) {
      toast.error('Please enter recipient phone numbers.');
      return;
    }

    const { valid, invalid } = parsePhoneList(phoneInput);

    if (invalid.length > 0) {
      setPhoneError(`Invalid numbers: ${invalid.join(', ')} — use format +91XXXXXXXXXX`);
      toast.error('Validation failed: Fix invalid phone number formats.');
      return;
    }

    setPhoneError('');
    try {
      await summarizeNotice(noticeText, valid);
      toast.success(`Sent to ${valid.length} students via WhatsApp! 📲`);
      setPhoneInput('');
    } catch (err) {
      // errors handled by api hooks
    }
  };

  // Handle flashcards generation
  const handleFlashcards = async () => {
    if (!lectureNotes.trim()) {
      setNotesError('Please enter your lecture notes before generating flashcards.');
      toast.error('Validation failed: Lecture notes input is empty.');
      return;
    }
    setNotesError('');
    try {
      const cards = await generateFlashcards(lectureNotes);
      setFlashcards(cards);
      toast.success('Generated study deck! 🧠');
    } catch (err) {
      // errors handled by api hooks
    }
  };

  // Handle Quiz generation
  const handleGenerateQuiz = async () => {
    if (!quizNotes.trim() || !quizSubject.trim() || !quizTopic.trim()) {
      setQuizError('All fields (notes, subject, and topic) are required.');
      toast.error('Validation failed: Fill out all inputs to generate a quiz.');
      return;
    }
    setQuizError('');
    try {
      const questions = await generateMCQs(quizNotes, quizSubject.trim(), quizTopic.trim(), 5);
      setMcqs(questions);
      toast.success('Quiz generated successfully! Go ahead and test yourself. 🎯');
    } catch (err) {
      // errors handled by api hooks
    }
  };

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          AI Learning Tools
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Summarize college updates or compile study aids from lecture content.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex bg-gray-150/70 dark:bg-gray-800 p-1 rounded-2xl max-w-lg border border-gray-200/50 dark:border-gray-700/50">
        <button
          onClick={() => setActiveTab('notice')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'notice'
              ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900'
          }`}
        >
          <Bell className="w-4 h-4" />
          Notice Summarizer
        </button>
        <button
          onClick={() => setActiveTab('flashcards')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'flashcards'
              ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900'
          }`}
        >
          <Library className="w-4 h-4" />
          Notes Flashcards
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'quiz'
              ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-900'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          Quiz Mode
        </button>
      </div>

      {/* Tab Content viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* Input panel (Left side) */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700/60 p-6 shadow-sm space-y-4">
          
          {activeTab === 'notice' && (
            /* Notice tab inputs */
            <>
              <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4.5 h-4.5 text-blue-600" />
                Raw Notice Text
              </h2>
              <textarea
                placeholder="Paste the official notice received on email or notice board here..."
                rows={8}
                value={noticeText}
                onChange={(e) => setNoticeText(e.target.value)}
                className="w-full p-4 border border-gray-250 dark:border-gray-705 bg-gray-50/50 dark:bg-gray-900/30 rounded-2xl text-sm placeholder-gray-400 focus:border-blue-500 leading-relaxed font-medium"
              ></textarea>
              <button
                type="button"
                onClick={handleSummarize}
                disabled={loading}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? <Spinner size="sm" /> : 'Summarize notice'}
              </button>
            </>
          )}

          {activeTab === 'flashcards' && (
            /* Flashcards tab inputs */
            <>
              <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Library className="w-4.5 h-4.5 text-blue-600" />
                Lecture Study Notes
              </h2>
              <textarea
                placeholder="Paste your lecture notes, slides text, or textbook reference sections here..."
                rows={8}
                value={lectureNotes}
                onChange={(e) => setLectureNotes(e.target.value)}
                className="w-full p-4 border border-gray-250 dark:border-gray-705 bg-gray-50/50 dark:bg-gray-900/30 rounded-2xl text-sm placeholder-gray-400 focus:border-blue-500 leading-relaxed font-medium"
              ></textarea>
              {notesError && (
                <p className="text-xs font-bold text-red-500 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {notesError}
                </p>
              )}
              <button
                type="button"
                onClick={handleFlashcards}
                disabled={loading}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? <Spinner size="sm" /> : 'Generate Flashcards'}
              </button>
            </>
          )}

          {activeTab === 'quiz' && (
            /* Quiz tab inputs */
            <>
              <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4.5 h-4.5 text-blue-600" />
                AI Study Buddy Quiz Generator
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Compiler Design"
                    value={quizSubject}
                    onChange={(e) => setQuizSubject(e.target.value)}
                    className="w-full p-3 border border-gray-250 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 rounded-xl text-sm placeholder-gray-400 focus:border-blue-500 font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">
                    Topic
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. LL(1) Parsers"
                    value={quizTopic}
                    onChange={(e) => setQuizTopic(e.target.value)}
                    className="w-full p-3 border border-gray-250 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 rounded-xl text-sm placeholder-gray-400 focus:border-blue-500 font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">
                  Lecture Study Notes
                </label>
                <textarea
                  placeholder="Paste lecture notes or paragraphs containing facts and details you want to be quizzed on..."
                  rows={6}
                  value={quizNotes}
                  onChange={(e) => setQuizNotes(e.target.value)}
                  className="w-full p-4 border border-gray-250 dark:border-gray-705 bg-gray-50/50 dark:bg-gray-900/30 rounded-2xl text-sm placeholder-gray-400 focus:border-blue-500 leading-relaxed font-medium"
                ></textarea>
              </div>

              {quizError && (
                <p className="text-xs font-bold text-red-500 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {quizError}
                </p>
              )}
              
              <button
                type="button"
                onClick={handleGenerateQuiz}
                disabled={loading}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? <Spinner size="sm" /> : 'Generate Live MCQ Quiz'}
              </button>
            </>
          )}

        </div>

        {/* Results viewport (Right side) */}
        <div className="space-y-6">
          
          {activeTab === 'notice' && (
            /* Notice Board Summaries / Broadcasts */
            summaryData ? (
              <div className="space-y-6">
                <SummaryResult 
                  summary={summaryData.summary}
                  eventTitle={summaryData.eventTitle}
                  eventDate={summaryData.eventDate}
                />

                {/* Recipient broadcasts panel */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-250 dark:border-gray-700/60 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    Broadcast WhatsApp Notification
                  </h3>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                      Recipients (One Phone per line, include country code)
                    </label>
                    <textarea
                      placeholder="+919876543210&#10;+918765432109"
                      rows={4}
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      className="w-full p-3 border border-gray-250 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 rounded-2xl text-xs placeholder-gray-400 focus:border-blue-500 font-semibold"
                    ></textarea>
                    <span className="text-[10px] text-gray-400 font-semibold leading-relaxed">
                      Enter phone numbers of students to notify (one per line, include country code)
                    </span>
                    {phoneError && (
                      <p className="mt-1.5 text-xs font-bold text-red-500 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {phoneError}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleBroadcast}
                    disabled={loading}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    Broadcast via WhatsApp
                  </button>
                </div>
              </div>
            ) : (
              /* Notice Empty State */
              <div className="p-8 text-center border border-dashed border-gray-250 dark:border-gray-750 bg-white/50 dark:bg-gray-800/30 rounded-3xl min-h-[300px] flex flex-col justify-center items-center">
                <Bell className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
                  Paste a college notice above to get an AI summary and broadcast it to your study group.
                </p>
              </div>
            )
          )}

          {activeTab === 'flashcards' && (
            /* Flashcards Study Deck results */
            flashcards.length > 0 ? (
              <FlashcardDeck flashcards={flashcards} />
            ) : (
              /* Flashcard Empty State */
              <div className="p-8 text-center border border-dashed border-gray-250 dark:border-gray-750 bg-white/50 dark:bg-gray-800/30 rounded-3xl min-h-[300px] flex flex-col justify-center items-center">
                <Library className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
                  Generate concept cards from lecture slides to study and flip.
                </p>
              </div>
            )
          )}

          {activeTab === 'quiz' && (
            /* MCQ Quiz results viewport */
            mcqs.length > 0 ? (
              <QuizMode mcqs={mcqs} onRetake={() => setMcqs([])} />
            ) : (
              /* Quiz Empty State or Loading state */
              loading ? (
                <div className="p-8 text-center border border-dashed border-gray-250 dark:border-gray-750 bg-white/50 dark:bg-gray-800/30 rounded-3xl min-h-[300px] flex flex-col justify-center items-center">
                  <Spinner size="lg" className="mb-3" />
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 leading-relaxed">
                    AI study buddy is analyzing notes and formulating customized multiple choice questions... 🎯
                  </p>
                </div>
              ) : (
                <div className="p-8 text-center border border-dashed border-gray-250 dark:border-gray-750 bg-white/50 dark:bg-gray-800/30 rounded-3xl min-h-[300px] flex flex-col justify-center items-center">
                  <CheckSquare className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3" />
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
                    Fill out the generator options on the left to start a customized, interactive live quiz session.
                  </p>
                </div>
              )
            )
          )}

        </div>

      </div>

    </div>
  );
}
