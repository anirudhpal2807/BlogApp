# Frontend Environment Variables for Render

## Required Environment Variables

Frontend को Render पर deploy करने के लिए ये environment variables चाहिए:

### 1. REACT_APP_API_URL (Required) ⚠️

**क्या है**: Backend API का URL

**Format**: 
```
REACT_APP_API_URL=https://your-backend-name.onrender.com/api
```

**Example**:
```
REACT_APP_API_URL=https://blog-backend.onrender.com/api
```

**Important Notes**:
- URL के अंत में `/api` जरूर होना चाहिए
- `https://` use करें (not `http://`)
- Backend deploy होने के बाद ही ये URL मिलेगा

### 2. REACT_APP_TINYMCE_API_KEY (Optional)

**क्या है**: TinyMCE editor के लिए API key

**Format**:
```
REACT_APP_TINYMCE_API_KEY=your-tinymce-api-key-here
```

**Example**:
```
REACT_APP_TINYMCE_API_KEY=v99mu09ovvihnu617reifpf9t3w74wx8o43ajxobmnh3d1a3
```

**Note**: 
- यह optional है (अभी हमने TinyMCE हटा दिया है, तो यह जरूरी नहीं)
- अगर TinyMCE use करना है तो free API key लें: https://www.tiny.cloud/

---

## Render Dashboard में कैसे Add करें

### Step 1: Frontend Service पर जाएं
1. Render dashboard में अपने frontend service पर जाएं
2. Settings → Environment

### Step 2: Environment Variables Add करें

**Variable 1:**
- **Key**: `REACT_APP_API_URL`
- **Value**: `https://your-backend-name.onrender.com/api`
  - Replace `your-backend-name` with your actual backend service name

**Variable 2 (Optional):**
- **Key**: `REACT_APP_TINYMCE_API_KEY`
- **Value**: `your-tinymce-api-key`

### Step 3: Save करें
- "Save Changes" पर click करें
- Frontend automatically rebuild होगा

---

## Complete Example

अगर आपका backend service name `blog-backend` है, तो:

```
REACT_APP_API_URL=https://blog-backend.onrender.com/api
REACT_APP_TINYMCE_API_KEY=v99mu09ovvihnu617reifpf9t3w74wx8o43ajxobmnh3d1a3
```

---

## Important Notes

### React Environment Variables Rules:
1. **REACT_APP_** prefix जरूरी है
2. Variables केवल build time पर inject होती हैं
3. Environment variable change के बाद rebuild जरूरी है

### Backend URL कैसे पाएं:
1. Backend service deploy करें
2. Render dashboard में backend service पर जाएं
3. URL copy करें (e.g., `https://blog-backend.onrender.com`)
4. `/api` add करें: `https://blog-backend.onrender.com/api`

### Testing:
1. Frontend deploy करने के बाद
2. Browser console खोलें (F12)
3. Network tab check करें
4. API calls सही URL पर जा रहे हैं या नहीं देखें

---

## Quick Checklist

- [ ] Backend deployed और running है
- [ ] Backend URL copy किया
- [ ] `REACT_APP_API_URL` set किया (with `/api`)
- [ ] `REACT_APP_TINYMCE_API_KEY` set किया (optional)
- [ ] Frontend rebuild हो गया
- [ ] Test किया - registration/login काम कर रहा है

---

## Troubleshooting

### Frontend can't connect to backend?
- ✅ Check `REACT_APP_API_URL` is correct
- ✅ Verify backend URL includes `/api`
- ✅ Make sure backend is running
- ✅ Check CORS settings in backend

### Environment variables not working?
- ✅ Make sure variable name starts with `REACT_APP_`
- ✅ Rebuild frontend after adding variables
- ✅ Check build logs in Render

### CORS errors?
- ✅ Update `FRONTEND_URL` in backend environment variables
- ✅ Backend will auto-redeploy

---

## Summary

**Minimum Required:**
```
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

**With TinyMCE (Optional):**
```
REACT_APP_API_URL=https://your-backend.onrender.com/api
REACT_APP_TINYMCE_API_KEY=your-key-here
```

That's it! 🎉

