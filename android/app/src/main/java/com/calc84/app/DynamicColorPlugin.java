package com.calc84.app;

import android.os.Build;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/** Material You: hands the wallpaper-based system accent color (Android 12+) to the web app. */
@CapacitorPlugin(name = "DynamicColor")
public class DynamicColorPlugin extends Plugin {
    @PluginMethod
    public void get(PluginCall call) {
        JSObject r = new JSObject();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            int c = getContext().getColor(android.R.color.system_accent1_500);
            r.put("accent", String.format("#%06x", c & 0xFFFFFF));
        }
        call.resolve(r); // no "accent" before Android 12: the app falls back to a picked color
    }
}
