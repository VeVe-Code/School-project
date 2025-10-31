const mongoose = require("mongoose");
const Contactus = require("../model/Contactus");
const { JSDOM } = require('jsdom');
const createDOMPurify = require('isomorphic-dompurify');
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

let contactuscontroller = {
  index: async (req, res) => {
    try {
      const search = req.query.search || "";

      const filter = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { message: { $regex: search, $options: "i" } }
        ]
      };

      const contactus = await Contactus.find(filter).sort({ createdAt: -1 });
      return res.json(contactus);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Server error" });
    }
  },

  show: async (req, res) => {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "id is invalid" });
      }

      const contactus = await Contactus.findById(id);
      if (!contactus) {
        return res.status(404).json({ msg: "Contactus not found" });
      }

      return res.json(contactus);
    } catch (e) {
      return res.status(500).json({ msg: "server error" });
    }
  },

  store: async (req, res) => {
    try {
      const { name, email, phno, msg } = req.body;
      const safeMsg = DOMPurify.sanitize(msg, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });

      const contactus = await Contactus.create({
        name,
        email,
        phno,
        msg: safeMsg
      });

      return res.json(contactus);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ msg: "server error" });
    }
  },

  destory: async (req, res) => { // ✅ fixed name
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "id is invalid" });
      }

      const contactus = await Contactus.findByIdAndDelete(id);
      if (!contactus) {
        return res.status(404).json({ msg: "Contactus not found" });
      }

      return res.json(contactus);
    } catch (e) {
      return res.status(500).json({ msg: "server error" });
    }
  }
};

module.exports = contactuscontroller;
