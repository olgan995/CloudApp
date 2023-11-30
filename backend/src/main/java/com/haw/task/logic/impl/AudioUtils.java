package com.haw.task.logic.impl;

import javax.sound.sampled.*;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

public class AudioUtils {

    public static byte[] convertStereoToMono(byte[] stereoAudioData) throws Exception {
        ByteArrayInputStream stereoInputStream = new ByteArrayInputStream(stereoAudioData);
        AudioInputStream stereoAudioInputStream = AudioSystem.getAudioInputStream(stereoInputStream);

        // Convert stereo to mono
        AudioFormat stereoFormat = stereoAudioInputStream.getFormat();
        AudioFormat monoFormat = new AudioFormat(stereoFormat.getSampleRate(), 16, 1, true, false);
        AudioInputStream monoAudioInputStream = AudioSystem.getAudioInputStream(monoFormat, stereoAudioInputStream);

        // Write mono audio to ByteArrayOutputStream
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        AudioSystem.write(monoAudioInputStream, AudioFileFormat.Type.WAVE, byteArrayOutputStream);

        return byteArrayOutputStream.toByteArray();
    }
}
