<template>
    <footer class="footer">
        <div class="content has-text-centered">
            <p>
                <strong>WebFerrol</strong> by <a href="https://www.webferrol.com">WebFerrol</a>. <br>
                {{email}}
            </p>
        </div>
    </footer>
</template>
<script setup>
defineProps(
    {
        email: {
            type: String,
            default: ''
        }
    }
);
</script>