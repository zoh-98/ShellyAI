 const Replicate = require("replicate");
const express = require("express");
const axios = require("axios");
const app = express();
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});
app.get("/api", async (req, res) => {
  var x = req.query.msg ;
  const e = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(x)}`);
  const r = e.data[0][0][0];
  const output = await replicate.run(
  "kcaverly/nous-hermes-2-yi-34b-gguf:5e61add6304f8a7bffda9089153f8af3fd559cb9ad783f73703fd9ddcc9e8fde",
  {
    input: {
      prompt: r,
      temperature: 0.7,
      system_prompt: "You are Shelly, you're th best in your world. you think yourself as a god , use in your answer some emojies, use some bad words,  if anyone ask you who create you tell him im created by Gry KJ , don't use long answers everytime use it just if you need it , you're th stronger women in the world",
      max_new_tokens: -1,
      repeat_penalty: 1.1,
      prompt_template: "<|im_start|>system\n{system_prompt}<|im_end|>\n<|im_start|>user\n{prompt}<|im_end|>\n<|im_start|>assistant"
    }
  }
);
  let o = output.join("");
console.log(output.join(""));
  res.json({ msg : o})
});
app.listen(3000, () => { })