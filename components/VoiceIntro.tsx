
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Loader2, Play, Square } from 'lucide-react';
import { GoogleGenAI, Modality } from "@google/genai";

const VoiceIntro: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const decodeBase64 = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const decodeAudioData = async (
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number
  ): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const stopVoice = () => {
    if (audioSourceRef.current) {
      audioSourceRef.current.stop();
      audioSourceRef.current = null;
    }
    setIsPlaying(false);
  };

  const playVoiceIntro = async () => {
    if (isPlaying) {
      stopVoice();
      return;
    }

    setIsLoading(true);
    try {
      // Fix: Strictly follow the guideline to use process.env.API_KEY directly in the constructor
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = "Say cheerfully: Hi there! I'm Arnob Mahmud, a Computer Science student at Rajshahi Polytechnic Institute. Welcome to my digital workspace! Feel free to explore my projects and connect with me.";
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Charon' }, // A clean male voice
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) throw new Error("No audio data received");

      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      
      const ctx = audioCtxRef.current;
      const audioBytes = decodeBase64(base64Audio);
      const audioBuffer = await decodeAudioData(audioBytes, ctx, 24000, 1);
      
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      
      source.onended = () => {
        setIsPlaying(false);
        audioSourceRef.current = null;
      };

      audioSourceRef.current = source;
      source.start();
      setIsPlaying(true);
    } catch (error) {
      console.error("TTS Error:", error);
      alert("AI Voice could not be generated. Please check your API Key configuration.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-44 right-8 z-[60] flex flex-col items-end">
      <AnimatePresence>
        {isPlaying && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="mb-4 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-2xl flex items-center space-x-3 shadow-2xl"
          >
            <div className="flex space-x-1 items-center h-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  animate={{ height: [4, 16, 4] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                  className="w-1 bg-blue-500 rounded-full"
                />
              ))}
            </div>
            <span className="text-xs font-bold text-white uppercase tracking-widest">AI Greeting...</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={playVoiceIntro}
        disabled={isLoading}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all border-2 border-white/20 ${
          isPlaying ? 'bg-red-500' : 'bg-blue-600'
        } ${isLoading ? 'opacity-50 cursor-wait' : 'cursor-pointer'}`}
      >
        {isLoading ? (
          <Loader2 className="animate-spin text-white" size={24} />
        ) : isPlaying ? (
          <Square className="text-white" size={24} fill="currentColor" />
        ) : (
          <Volume2 className="text-white" size={24} />
        )}
        
        {!isPlaying && !isLoading && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 border-2 border-white dark:border-slate-950"></span>
          </span>
        )}
      </motion.button>
      
      <div className="mt-2 text-[10px] font-black uppercase tracking-tighter text-slate-500 dark:text-slate-400 text-right pr-1">
        Voice Intro
      </div>
    </div>
  );
};

export default VoiceIntro;
